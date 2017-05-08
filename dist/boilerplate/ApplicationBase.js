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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "dojo/_base/kernel", "esri/config", "esri/core/promiseUtils", "esri/identity/IdentityManager", "esri/identity/OAuthInfo", "esri/portal/Portal", "esri/portal/PortalItem", "esri/portal/PortalQueryParams"], function (require, exports, kernel, esriConfig, promiseUtils, IdentityManager, OAuthInfo, Portal, PortalItem, PortalQueryParams) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultConfig = {
        portalUrl: "https://www.arcgis.com",
        helperServices: {
            geometry: {},
            printTask: {},
            elevationSync: {},
            geocode: []
        }
    };
    var defaultSettings = {
        environment: {},
        group: {},
        localStorage: {},
        portal: {},
        urlParams: [],
        webmap: {},
        webscene: {}
    };
    var ApplicationBase = (function () {
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function ApplicationBase(applicationConfig, ApplicationBaseConfig) {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  settings
            //----------------------------------
            this.settings = defaultSettings;
            //----------------------------------
            //  config
            //----------------------------------
            this.config = defaultConfig;
            //----------------------------------
            //  results
            //----------------------------------
            this.results = {};
            //----------------------------------
            //  portal
            //----------------------------------
            this.portal = null;
            //----------------------------------
            //  direction
            //----------------------------------
            this.direction = null;
            //----------------------------------
            //  locale
            //----------------------------------
            this.locale = kernel.locale;
            //----------------------------------
            //  units
            //----------------------------------
            this.units = null;
            if (typeof applicationConfig === "string") {
                applicationConfig = JSON.parse(applicationConfig);
            }
            if (typeof ApplicationBaseConfig === "string") {
                ApplicationBaseConfig = JSON.parse(ApplicationBaseConfig);
            }
            this.settings = __assign({}, defaultSettings, ApplicationBaseConfig);
            this.config = __assign({}, defaultConfig, applicationConfig);
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        ApplicationBase.prototype.queryGroupItems = function (groupId, itemParams, portal) {
            if (!portal) {
                portal = this.portal;
            }
            var defaultGroup = this.settings.group.default;
            groupId = this._getDefaultId(groupId, defaultGroup);
            var paramOptions = __assign({ query: "group:\"" + groupId + "\" AND -type:\"Code Attachment\"", sortField: "modified", sortOrder: "desc", num: 9, start: 1 }, itemParams);
            var params = new PortalQueryParams(paramOptions);
            return portal.queryItems(params);
        };
        ApplicationBase.prototype.load = function () {
            var _this = this;
            var urlParams = this._getUrlParamValues(this.settings.urlParams);
            this.results.urlParams = urlParams;
            this.config = this._mixinAllConfigs({
                config: this.config,
                url: urlParams
            });
            if (this.settings.environment.isEsri) {
                var esriPortalUrl = this._getEsriEnvironmentPortalUrl();
                this.config.portalUrl = esriPortalUrl;
                this.config.proxyUrl = this._getEsriEnvironmentProxyUrl(esriPortalUrl);
            }
            this._setPortalUrl(this.config.portalUrl);
            this._setProxyUrl(this.config.proxyUrl);
            this.direction = this._getLanguageDirection();
            var checkSignIn = this._checkSignIn(this.config.oauthappid, this.config.portalUrl);
            return checkSignIn.always(function () {
                var appId = _this.config.appid;
                var queryApplicationItem = appId ?
                    _this._queryItem(appId) : promiseUtils.resolve();
                var queryApplicationData = appId ?
                    queryApplicationItem.then(function (itemInfo) {
                        return itemInfo instanceof PortalItem ?
                            itemInfo.fetchData() :
                            undefined;
                    }) :
                    promiseUtils.resolve();
                var queryPortal = _this.settings.portal.fetch ?
                    _this._queryPortal() :
                    promiseUtils.resolve();
                return promiseUtils.eachAlways([
                    queryApplicationItem,
                    queryApplicationData,
                    queryPortal
                ]).always(function (applicationArgs) {
                    var applicationItemResponse = applicationArgs[0], applicationDataResponse = applicationArgs[1], portalResponse = applicationArgs[2];
                    var localStorage = _this.settings.localStorage.fetch ?
                        _this._getLocalConfig(appId) :
                        null;
                    _this.results.localStorage = localStorage;
                    var applicationItem = applicationItemResponse ?
                        applicationItemResponse.value :
                        null;
                    var applicationData = applicationDataResponse ?
                        applicationDataResponse.value :
                        null;
                    _this.results.applicationItem = applicationItem;
                    _this.results.applicationData = applicationData;
                    var applicationConfig = applicationData ?
                        applicationData.values :
                        null;
                    var portal = portalResponse ? portalResponse.value : null;
                    _this.portal = portal;
                    _this.units = _this._getUnits(portal);
                    _this.config = _this._mixinAllConfigs({
                        config: _this.config,
                        url: urlParams,
                        local: localStorage,
                        application: applicationConfig
                    });
                    _this._setupCORS(portal.authorizedCrossOriginDomains, _this.settings.environment.webTierSecurity);
                    _this._setGeometryService(_this.config, portal);
                    var _a = _this.config, webmap = _a.webmap, webscene = _a.webscene, group = _a.group;
                    var webmapPromises = [];
                    var webscenePromises = [];
                    var groupInfoPromises = [];
                    var groupItemsPromises = [];
                    var isWebMapEnabled = _this.settings.webmap.fetch && webmap;
                    var isWebSceneEnabled = _this.settings.webscene.fetch && webscene;
                    var isGroupInfoEnabled = _this.settings.group.fetchInfo && group;
                    var isGroupItemsEnabled = _this.settings.group.fetchItems && group;
                    var itemParams = _this.settings.group.itemParams;
                    var defaultWebMap = _this.settings.webmap.default;
                    var defaultWebScene = _this.settings.webscene.default;
                    var defaultGroup = _this.settings.group.default;
                    if (isWebMapEnabled) {
                        var webmaps = _this._getPropertyArray(webmap);
                        webmaps.forEach(function (id) {
                            var webMapId = _this._getDefaultId(id, defaultWebMap);
                            webmapPromises.push(_this._queryItem(webMapId));
                        });
                    }
                    if (isWebSceneEnabled) {
                        var webscenes = _this._getPropertyArray(webscene);
                        webscenes.forEach(function (id) {
                            var webSceneId = _this._getDefaultId(id, defaultWebScene);
                            webscenePromises.push(_this._queryItem(webSceneId));
                        });
                    }
                    if (isGroupInfoEnabled) {
                        var groups = _this._getPropertyArray(group);
                        groups.forEach(function (id) {
                            var groupId = _this._getDefaultId(id, defaultGroup);
                            groupInfoPromises.push(_this._queryGroupInfo(groupId, portal));
                        });
                    }
                    if (isGroupItemsEnabled) {
                        var groups = _this._getPropertyArray(group);
                        groups.forEach(function (id) {
                            groupItemsPromises.push(_this.queryGroupItems(id, itemParams, portal));
                        });
                    }
                    var promises = {
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
                    return promiseUtils.eachAlways(promises).always(function (itemArgs) {
                        var webmapResponses = itemArgs.webmap.value || [];
                        var websceneResponses = itemArgs.webscene.value || [];
                        var groupInfoResponses = itemArgs.groupInfo.value || [];
                        var groupItemsResponses = itemArgs.groupItems.value || [];
                        //console.log(applicationItem);
                        // todo: mixin sourceUrl with proxyUrl
                        // const appProxies = applicationInfo.appProxies;
                        var itemInfo = applicationItem ? applicationItem.itemInfo : null;
                        _this._overwriteItems(webmapResponses, itemInfo);
                        _this._overwriteItems(websceneResponses, itemInfo);
                        _this.results.webMapItems = webmapResponses;
                        _this.results.webSceneItems = websceneResponses;
                        _this.results.groupInfos = groupInfoResponses;
                        _this.results.groupItems = groupItemsResponses;
                        return _this;
                    });
                });
            });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        ApplicationBase.prototype._getPropertyArray = function (property) {
            if (typeof property === "string") {
                return property.split(",");
            }
            if (Array.isArray(property)) {
                return property;
            }
            return [];
        };
        ApplicationBase.prototype._getUnits = function (portal) {
            var user = portal.user;
            var userRegion = user && user.region;
            var userUnits = user && user.units;
            var responseUnits = portal.units;
            var responseRegion = portal.region;
            var ipCountryCode = portal.ipCntryCode;
            var isEnglishUnits = (userRegion === "US") ||
                (userRegion && responseRegion === "US") ||
                (userRegion && !responseRegion) ||
                (!user && ipCountryCode === "US") ||
                (!user && !ipCountryCode && kernel.locale === "en-us");
            var units = userUnits ? userUnits : responseUnits ? responseUnits : isEnglishUnits ? "english" : "metric";
            return units;
        };
        ApplicationBase.prototype._getLocalConfig = function (appid) {
            if (!(window.localStorage && appid)) {
                return;
            }
            var localStoragePrefix = "application_base_config_";
            var lsItem = localStorage.getItem(localStoragePrefix + appid);
            var localConfig = lsItem && JSON.parse(lsItem);
            return localConfig;
        };
        ApplicationBase.prototype._queryItem = function (id) {
            var item = new PortalItem({
                id: id
            });
            return item.load();
        };
        ApplicationBase.prototype._queryGroupInfo = function (groupId, portal) {
            var params = new PortalQueryParams({
                query: "id:\"" + groupId + "\""
            });
            return portal.queryGroups(params);
        };
        ApplicationBase.prototype._setupCORS = function (authorizedDomains, webTierSecurity) {
            if (!webTierSecurity || !authorizedDomains || !authorizedDomains.length) {
                return;
            }
            authorizedDomains.forEach(function (authorizedDomain) {
                var isDefined = (authorizedDomain !== undefined) && (authorizedDomain !== null);
                if (isDefined && authorizedDomain.length) {
                    esriConfig.request.corsEnabledServers.push({
                        host: authorizedDomain,
                        withCredentials: true
                    });
                }
            });
        };
        ApplicationBase.prototype._queryPortal = function () {
            return new Portal().load();
        };
        ApplicationBase.prototype._overwriteItems = function (responses, applicationItem) {
            var _this = this;
            if (!responses) {
                return;
            }
            responses.forEach(function (response) {
                var value = response.value;
                if (value) {
                    _this._overwriteItemExtent(value, applicationItem);
                }
            });
        };
        ApplicationBase.prototype._overwriteItemExtent = function (item, applicationItem) {
            if (!item || !applicationItem) {
                return;
            }
            var applicationExtent = applicationItem.extent;
            item.extent = applicationExtent ? applicationExtent : item.extent;
        };
        ApplicationBase.prototype._setGeometryService = function (config, ptl) {
            var portal = ptl; // todo: fix next api release. helperServices are not on portal currently.
            var configHelperServices = config.helperServices;
            var portalHelperServices = portal && portal.helperServices;
            var configGeometryUrl = configHelperServices && configHelperServices.geometry && configHelperServices.geometry.url;
            var portalGeometryUrl = portalHelperServices && portalHelperServices.geometry && portalHelperServices.geometry.url;
            var geometryUrl = portalGeometryUrl || configGeometryUrl;
            if (!geometryUrl) {
                return;
            }
            esriConfig.geometryServiceUrl = geometryUrl;
        };
        ApplicationBase.prototype._getDefaultId = function (id, defaultId) {
            var defaultUrlParam = "default";
            var trimmedId = id ? id.trim() : "";
            var useDefaultId = (!trimmedId || trimmedId === defaultUrlParam) && defaultId;
            if (useDefaultId) {
                return defaultId;
            }
            return id;
        };
        ApplicationBase.prototype._getLanguageDirection = function () {
            var LTR = "ltr";
            var RTL = "rtl";
            var RTLLangs = ["ar", "he"];
            var isRTL = RTLLangs.some(function (language) {
                return kernel.locale.indexOf(language) !== -1;
            });
            return isRTL ? RTL : LTR;
        };
        ApplicationBase.prototype._mixinAllConfigs = function (params) {
            var config = params.config || null;
            var appConfig = params.application || null;
            var localConfig = params.local || null;
            var urlConfig = params.url || null;
            return __assign({}, config, appConfig, localConfig, urlConfig);
        };
        ApplicationBase.prototype._setPortalUrl = function (portalUrl) {
            esriConfig.portalUrl = portalUrl;
        };
        ApplicationBase.prototype._setProxyUrl = function (proxyUrl) {
            esriConfig.request.proxyUrl = proxyUrl;
        };
        ApplicationBase.prototype._getEsriEnvironmentPortalUrl = function () {
            var pathname = location.pathname;
            var esriAppsPath = "/apps/";
            var esriHomePath = "/home/";
            var esriAppsPathIndex = pathname.indexOf(esriAppsPath);
            var esriHomePathIndex = pathname.indexOf(esriHomePath);
            var isEsriAppsPath = esriAppsPathIndex !== -1 ? true : false;
            var isEsriHomePath = esriHomePathIndex !== -1 ? true : false;
            var appLocationIndex = isEsriAppsPath ?
                esriAppsPathIndex :
                isEsriHomePath ?
                    esriHomePathIndex :
                    undefined;
            if (appLocationIndex === undefined) {
                return;
            }
            var portalInstance = pathname.substr(0, appLocationIndex);
            var host = location.host;
            return "https://" + host + portalInstance;
        };
        ApplicationBase.prototype._getEsriEnvironmentProxyUrl = function (portalUrl) {
            var esriProxyPath = "/sharing/proxy";
            return "" + portalUrl + esriProxyPath;
        };
        ApplicationBase.prototype._checkSignIn = function (oauthappid, portalUrl) {
            var sharingPath = "/sharing";
            var info = oauthappid ?
                new OAuthInfo({
                    appId: oauthappid,
                    portalUrl: portalUrl,
                    popup: true
                }) : null;
            if (info) {
                IdentityManager.registerOAuthInfos([info]);
            }
            var signedIn = IdentityManager.checkSignInStatus(portalUrl + sharingPath);
            return signedIn.always(promiseUtils.resolve);
        };
        ApplicationBase.prototype._getUrlParamValues = function (urlParams) {
            var _this = this;
            var urlObject = this._urlToObject();
            var formattedUrlObject = {};
            if (!urlObject || !urlParams || !urlParams.length) {
                return;
            }
            urlParams.forEach(function (param) {
                var urlParamValue = urlObject[param];
                if (urlParamValue) {
                    formattedUrlObject[param] = _this._foramatUrlParamValue(urlParamValue);
                }
            });
            return formattedUrlObject;
        };
        ApplicationBase.prototype._urlToObject = function () {
            var _this = this;
            var query = (window.location.search || "?").substr(1), map = {};
            var urlRE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
            query.replace(urlRE, function (match, key, value) {
                map[key] = _this._stripStringTags(decodeURIComponent(value));
                return "";
            });
            return map;
        };
        ApplicationBase.prototype._foramatUrlParamValue = function (urlParamValue) {
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
        };
        ApplicationBase.prototype._stripStringTags = function (value) {
            var tagsRE = /<\/?[^>]+>/g;
            return value.replace(tagsRE, "");
        };
        return ApplicationBase;
    }());
    exports.default = ApplicationBase;
});
//# sourceMappingURL=ApplicationBase.js.map