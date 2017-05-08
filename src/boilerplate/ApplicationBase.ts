/*
  Copyright 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/

import kernel = require("dojo/_base/kernel");

import esriConfig = require("esri/config");

import Extent = require("esri/geometry/Extent");

import promiseUtils = require("esri/core/promiseUtils");

import IdentityManager = require("esri/identity/IdentityManager");
import OAuthInfo = require("esri/identity/OAuthInfo");

import Portal = require("esri/portal/Portal");
import PortalItem = require("esri/portal/PortalItem");
import PortalQueryParams = require("esri/portal/PortalQueryParams");

import {
  ApplicationConfig,
  ApplicationConfigs,
  ApplicationBaseResult,
  ApplicationBaseResults,
  ApplicationBaseSettings
} from "./interfaces";

type Direction = "ltr" | "rtl";

interface ApplicationBaseItemPromises {
  webmap?: IPromise<any>;
  webscene?: IPromise<any>;
  groupInfo?: IPromise<any>;
  groupItems?: IPromise<any>;
}

const defaultConfig = {
  portalUrl: "https://www.arcgis.com",
  helperServices: {
    geometry: {},
    printTask: {},
    elevationSync: {},
    geocode: []
  }
}

const defaultSettings = {
  environment: {},
  group: {},
  localStorage: {},
  portal: {},
  urlParams: [],
  webmap: {},
  webscene: {}
};

class ApplicationBase {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(applicationConfig: any, ApplicationBaseConfig: any) {
    if (typeof applicationConfig === "string") {
      applicationConfig = JSON.parse(applicationConfig);
    }

    if (typeof ApplicationBaseConfig === "string") {
      ApplicationBaseConfig = JSON.parse(ApplicationBaseConfig);
    }

    this.settings = {
      ...defaultSettings,
      ...ApplicationBaseConfig
    }
    this.config = {
      ...defaultConfig,
      ...applicationConfig
    };
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  settings
  //----------------------------------
  settings: ApplicationBaseSettings = defaultSettings;

  //----------------------------------
  //  config
  //----------------------------------
  config: ApplicationConfig = defaultConfig;

  //----------------------------------
  //  results
  //----------------------------------
  results: ApplicationBaseResults = {};

  //----------------------------------
  //  portal
  //----------------------------------
  portal: Portal = null;

  //----------------------------------
  //  direction
  //----------------------------------
  direction: Direction = null;

  //----------------------------------
  //  locale
  //----------------------------------
  locale = kernel.locale;

  //----------------------------------
  //  units
  //----------------------------------
  units: string = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  queryGroupItems(groupId: string, itemParams: any, portal?: Portal): IPromise<any> {

    if (!portal) {
      portal = this.portal;
    }

    const defaultGroup = this.settings.group.default;
    groupId = this._getDefaultId(groupId, defaultGroup);

    const paramOptions = {
      query: `group:"${groupId}" AND -type:"Code Attachment"`,
      sortField: "modified",
      sortOrder: "desc",
      num: 9,
      start: 1,
      ...itemParams
    };

    const params = new PortalQueryParams(paramOptions);
    return portal.queryItems(params);
  }

  load(): IPromise<ApplicationBase> {
    const urlParams = this._getUrlParamValues(this.settings.urlParams);
    this.results.urlParams = urlParams

    this.config = this._mixinAllConfigs({
      config: this.config,
      url: urlParams
    });

    if (this.settings.environment.isEsri) {
      const esriPortalUrl = this._getEsriEnvironmentPortalUrl();
      this.config.portalUrl = esriPortalUrl;
      this.config.proxyUrl = this._getEsriEnvironmentProxyUrl(esriPortalUrl);
    }

    this._setPortalUrl(this.config.portalUrl)
    this._setProxyUrl(this.config.proxyUrl);

    this.direction = this._getLanguageDirection();

    const checkSignIn = this._checkSignIn(this.config.oauthappid, this.config.portalUrl);
    return checkSignIn.always(() => {
      const appId = this.config.appid;

      const queryApplicationItem = appId ?
        this._queryItem(appId) : promiseUtils.resolve();

      const queryApplicationData = appId ?
        queryApplicationItem.then(itemInfo => {
          return itemInfo instanceof PortalItem ?
            itemInfo.fetchData() :
            undefined;
        }) :
        promiseUtils.resolve();

      const queryPortal = this.settings.portal.fetch ?
        this._queryPortal() :
        promiseUtils.resolve();

      return promiseUtils.eachAlways([
        queryApplicationItem,
        queryApplicationData,
        queryPortal
      ]).always(applicationArgs => {
        const [applicationItemResponse, applicationDataResponse, portalResponse] = applicationArgs;

        const localStorage = this.settings.localStorage.fetch ?
          this._getLocalConfig(appId) :
          null;
        this.results.localStorage = localStorage;

        const applicationItem = applicationItemResponse ?
          applicationItemResponse.value :
          null;

        const applicationData = applicationDataResponse ?
          applicationDataResponse.value :
          null;

        this.results.applicationItem = applicationItem;
        this.results.applicationData = applicationData;

        const applicationConfig = applicationData ?
          applicationData.values :
          null;

        const portal = portalResponse ? portalResponse.value : null;
        this.portal = portal;

        this.units = this._getUnits(portal);

        this.config = this._mixinAllConfigs({
          config: this.config,
          url: urlParams,
          local: localStorage,
          application: applicationConfig
        });

        this._setupCORS(portal.authorizedCrossOriginDomains, this.settings.environment.webTierSecurity);
        this._setGeometryService(this.config, portal);

        const { webmap, webscene, group } = this.config;

        const webmapPromises = [];
        const webscenePromises = [];
        const groupInfoPromises = [];
        const groupItemsPromises = [];

        const isWebMapEnabled = this.settings.webmap.fetch && webmap;
        const isWebSceneEnabled = this.settings.webscene.fetch && webscene;
        const isGroupInfoEnabled = this.settings.group.fetchInfo && group;
        const isGroupItemsEnabled = this.settings.group.fetchItems && group;
        const itemParams = this.settings.group.itemParams;
        const defaultWebMap = this.settings.webmap.default;
        const defaultWebScene = this.settings.webscene.default;
        const defaultGroup = this.settings.group.default;

        if (isWebMapEnabled) {
          const webmaps = this._getPropertyArray(webmap);
          webmaps.forEach(id => {
            const webMapId = this._getDefaultId(id, defaultWebMap);
            webmapPromises.push(this._queryItem(webMapId));
          });
        }

        if (isWebSceneEnabled) {
          const webscenes = this._getPropertyArray(webscene);
          webscenes.forEach(id => {
            const webSceneId = this._getDefaultId(id, defaultWebScene);
            webscenePromises.push(this._queryItem(webSceneId));
          });
        }

        if (isGroupInfoEnabled) {
          const groups = this._getPropertyArray(group);
          groups.forEach(id => {
            const groupId = this._getDefaultId(id, defaultGroup);
            groupInfoPromises.push(this._queryGroupInfo(groupId, portal));
          });
        }

        if (isGroupItemsEnabled) {
          const groups = this._getPropertyArray(group);
          groups.forEach(id => {
            groupItemsPromises.push(this.queryGroupItems(id, itemParams, portal));
          });
        }

        const promises: ApplicationBaseItemPromises = {
          webmap: webmapPromises.length ?
            promiseUtils.eachAlways(webmapPromises) :
            promiseUtils.resolve(),
          webscene: webscenePromises.length ?
            promiseUtils.eachAlways(webscenePromises) :
            promiseUtils.resolve(),
          groupInfo: groupInfoPromises.length ?
            promiseUtils.eachAlways(groupInfoPromises) :
            promiseUtils.resolve(),
          groupItems: groupItemsPromises.length ?
            promiseUtils.eachAlways(groupItemsPromises) :
            promiseUtils.resolve()
        };

        return promiseUtils.eachAlways(promises).always(itemArgs => {
          const webmapResponses = itemArgs.webmap.value || [];
          const websceneResponses = itemArgs.webscene.value || [];
          const groupInfoResponses = itemArgs.groupInfo.value || [];
          const groupItemsResponses = itemArgs.groupItems.value || [];

          //console.log(applicationItem);
          // todo: mixin sourceUrl with proxyUrl
          // const appProxies = applicationInfo.appProxies;

          const itemInfo = applicationItem ? applicationItem.itemInfo : null;
          this._overwriteItems(webmapResponses, itemInfo);
          this._overwriteItems(websceneResponses, itemInfo);

          this.results.webMapItems = webmapResponses;
          this.results.webSceneItems = websceneResponses;
          this.results.groupInfos = groupInfoResponses;
          this.results.groupItems = groupItemsResponses;

          return this;
        });
      });
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _getPropertyArray(property: string | string[]): string[] {
    if (typeof property === "string") {
      return property.split(",");
    }
    if (Array.isArray(property)) {
      return property;
    }

    return [];
  }

  private _getUnits(portal: Portal): string {
    const user = portal.user;
    const userRegion = user && user.region;
    const userUnits = user && user.units;
    const responseUnits = portal.units;
    const responseRegion = portal.region;
    const ipCountryCode = portal.ipCntryCode;
    const isEnglishUnits = (userRegion === "US") ||
      (userRegion && responseRegion === "US") ||
      (userRegion && !responseRegion) ||
      (!user && ipCountryCode === "US") ||
      (!user && !ipCountryCode && kernel.locale === "en-us");
    const units = userUnits ? userUnits : responseUnits ? responseUnits : isEnglishUnits ? "english" : "metric";
    return units;
  }

  private _getLocalConfig(appid: string): ApplicationConfig {
    if (!(window.localStorage && appid)) {
      return;
    }

    const localStoragePrefix = "application_base_config_";
    const lsItem = localStorage.getItem(localStoragePrefix + appid);
    const localConfig = lsItem && JSON.parse(lsItem);
    return localConfig;
  }

  private _queryItem(id: string): IPromise<PortalItem> {
    const item = new PortalItem({
      id: id
    });
    return item.load();
  }

  private _queryGroupInfo(groupId: string, portal: Portal): IPromise<any> {
    const params = new PortalQueryParams({
      query: `id:"${groupId}"`
    });
    return portal.queryGroups(params);
  }

  private _setupCORS(authorizedDomains: any, webTierSecurity: boolean): void {
    if (!webTierSecurity || !authorizedDomains || !authorizedDomains.length) {
      return;
    }

    authorizedDomains.forEach(authorizedDomain => {
      const isDefined = (authorizedDomain !== undefined) && (authorizedDomain !== null);
      if (isDefined && authorizedDomain.length) {
        esriConfig.request.corsEnabledServers.push({
          host: authorizedDomain,
          withCredentials: true
        });
      }
    });
  }

  private _queryPortal(): IPromise<Portal> {
    return new Portal().load();
  }

  private _overwriteItems(responses: ApplicationBaseResult[], applicationItem: PortalItem): void {
    if (!responses) {
      return;
    }

    responses.forEach(response => {
      const { value } = response;
      if (value) {
        this._overwriteItemExtent(value, applicationItem);
      }
    });
  }

  private _overwriteItemExtent(item: PortalItem, applicationItem: PortalItem): void {
    if (!item || !applicationItem) {
      return;
    }

    const applicationExtent = applicationItem.extent;

    item.extent = applicationExtent ? applicationExtent : item.extent;
  }

  private _setGeometryService(config: ApplicationConfig, ptl: Portal): void {
    const portal = ptl as any; // todo: fix next api release. helperServices are not on portal currently.
    const configHelperServices = config.helperServices;
    const portalHelperServices = portal && portal.helperServices;
    const configGeometryUrl = configHelperServices && configHelperServices.geometry && configHelperServices.geometry.url;
    const portalGeometryUrl = portalHelperServices && portalHelperServices.geometry && portalHelperServices.geometry.url;
    const geometryUrl = portalGeometryUrl || configGeometryUrl;
    if (!geometryUrl) {
      return;
    }
    esriConfig.geometryServiceUrl = geometryUrl;
  }

  private _getDefaultId(id: string, defaultId: string): string {
    const defaultUrlParam = "default";
    const trimmedId = id ? id.trim() : "";
    const useDefaultId = (!trimmedId || trimmedId === defaultUrlParam) && defaultId;
    if (useDefaultId) {
      return defaultId;
    }
    return id;
  }

  private _getLanguageDirection(): Direction {
    const LTR = "ltr";
    const RTL = "rtl";
    const RTLLangs = ["ar", "he"];
    const isRTL = RTLLangs.some(language => {
      return kernel.locale.indexOf(language) !== -1;
    });
    return isRTL ? RTL : LTR;
  }

  private _mixinAllConfigs(params: ApplicationConfigs): ApplicationConfig {
    const config = params.config || null;
    const appConfig = params.application || null;
    const localConfig = params.local || null;
    const urlConfig = params.url || null;
    return {
      ...config,
      ...appConfig,
      ...localConfig,
      ...urlConfig
    }
  }

  private _setPortalUrl(portalUrl: string): void {
    esriConfig.portalUrl = portalUrl;
  }

  private _setProxyUrl(proxyUrl: string): void {
    esriConfig.request.proxyUrl = proxyUrl;
  }

  private _getEsriEnvironmentPortalUrl(): string {
    const pathname = location.pathname;
    const esriAppsPath = "/apps/";
    const esriHomePath = "/home/";
    const esriAppsPathIndex = pathname.indexOf(esriAppsPath);
    const esriHomePathIndex = pathname.indexOf(esriHomePath);
    const isEsriAppsPath = esriAppsPathIndex !== -1 ? true : false;
    const isEsriHomePath = esriHomePathIndex !== -1 ? true : false;
    const appLocationIndex = isEsriAppsPath ?
      esriAppsPathIndex :
      isEsriHomePath ?
        esriHomePathIndex :
        undefined;

    if (appLocationIndex === undefined) {
      return;
    }

    const portalInstance = pathname.substr(0, appLocationIndex);
    const host = location.host;
    return `https://${host}${portalInstance}`;
  }

  private _getEsriEnvironmentProxyUrl(portalUrl: string): string {
    const esriProxyPath = "/sharing/proxy";
    return `${portalUrl}${esriProxyPath}`;
  }

  private _checkSignIn(oauthappid: string, portalUrl: string): IPromise<void> {
    const sharingPath = "/sharing";
    const info = oauthappid ?
      new OAuthInfo({
        appId: oauthappid,
        portalUrl: portalUrl,
        popup: true
      }) : null;

    if (info) {
      IdentityManager.registerOAuthInfos([info]);
    }

    const signedIn = IdentityManager.checkSignInStatus(portalUrl + sharingPath);
    return signedIn.always(promiseUtils.resolve);
  }

  private _getUrlParamValues(urlParams: string[]): ApplicationConfig {
    const urlObject = this._urlToObject();
    const formattedUrlObject = {};

    if (!urlObject || !urlParams || !urlParams.length) {
      return;
    }

    urlParams.forEach(param => {
      const urlParamValue = urlObject[param];
      if (urlParamValue) {
        formattedUrlObject[param] = this._foramatUrlParamValue(urlParamValue);
      }
    });

    return formattedUrlObject;
  }

  private _urlToObject(): any {
    const query = (window.location.search || "?").substr(1),
      map = {};
    const urlRE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
    query.replace(urlRE, (match, key, value) => {
      map[key] = this._stripStringTags(decodeURIComponent(value));
      return "";
    });
    return map;
  }

  private _foramatUrlParamValue(urlParamValue: any): any {
    if (typeof urlParamValue === "string") {
      switch (urlParamValue.toLowerCase()) {
        case "true":
          return true;
        case "false":
          return false;
        default:
          return urlParamValue;
      }
    }
    return urlParamValue;
  }

  private _stripStringTags(value: string) {
    const tagsRE = /<\/?[^>]+>/g;
    return value.replace(tagsRE, "");
  }

}

export default ApplicationBase;