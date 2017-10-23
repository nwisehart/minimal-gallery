define(["dojo/io-query","dojo/promise/all","esriApplicationBase/ApplicationBase","esri/core/accessorSupport/decorators","esri/widgets/Widget","esri/widgets/support/widget","esri/core/promiseUtils","esri/core/requireUtils"],function(e,t,n,r,i,o,a,s){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,n){"use strict";function r(e){return e.middlewares?a.apply(void 0,e.middlewares)(o)(e.reducers,e.parentWidget,e.initialState):o(e.reducers,e.parentWidget,e.initialState)}function i(e){var t=c(e,function(e){return"function"==typeof e});return function(e,n){return void 0===e&&(e={}),l(t,function(t,r){return t(e[r],n)})}}function o(e,t,n){var r;n&&(r=n);var i=[],o={parentWidget:t,dispatch:function(n){r=e(r,n),i.forEach(function(e){return e(r)}),t.scheduleRender()},subscribe:function(e){return i.push(e),function(){var t=i.indexOf(e);i.splice(t,1)}},getState:function(){return r}};return o.dispatch({type:"INITIALIZE"}),o}function a(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return function(n,r,i){var o=t(n,r,i),a=o.dispatch,l=[];return l=e.map(function(e){return e({getState:o.getState,dispatch:function(e){return a(e)}})}),a=s.apply(void 0,l)(o.dispatch),u({},o,{dispatch:a})}}}function s(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduceRight(function(e,t){return t(e)},t)}}function l(e,t){return Object.keys(e).reduce(function(n,r){return n[r]=t(e[r],r),n},{})}function c(e,t){return Object.keys(e).reduce(function(n,r){return t(e[r])&&(n[r]=e[r]),n},{})}var u=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var p=n(14),d=function(){function e(e){this.childComponents={},this.dirty=!0,this.store=e,this.props=e.getState(),this.tsx=this.tsx.bind(this),this.updateProps=this.updateProps.bind(this),e.subscribe(this.updateProps)}return e.prototype.tsx=function(e,t,n){if("string"==typeof e)return p.tsx.apply(this,arguments);if(t&&t.key){var i=this.childComponents[t.key];return i?(i.dirty&&(i.renderResult=i.render()),i.renderResult):(this.childComponents[t.key]=new e(t.store?r(u({},t.store,{parentWidget:this.store.parentWidget})):this.store,t.key),this.childComponents[t.key].renderResult=this.childComponents[t.key].render(),this.childComponents[t.key].renderResult)}throw new Error("Custom components must each have a unique key property.")},e.prototype.render=function(){},e.prototype.componentWillReceiveProps=function(e){},e.prototype.shouldComponentUpdate=function(e){return!0},e.prototype.setState=function(e){this.state=u({},this.state,e),this.store.parentWidget.scheduleRender()},e.prototype.dispatch=function(e){this.store.dispatch(e)},e.prototype.updateProps=function(e){this.componentWillReceiveProps(e),this.dirty=this.shouldComponentUpdate(e),this.props=e},e}();t.default=d,t.newStore=r,t.combineReducers=i,t.middlewares={thunk:function(e){return function(t){return function(n){return"function"==typeof n?n(e.dispatch,e.getState):t(n)}}},debug:function(e){return function(t){return function(n){console.log(n.type,n);var r=t(n);return console.log("next state",e.getState()),r}}},addListener:function(e){return function(t){return function(n){return function(r){var i=n(r);return e(r,t.getState()),i}}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15);t.SAVE_APP_BASE_RESULT=r.SAVE_APP_BASE_RESULT,t.LOAD_APP_FAIL=r.LOAD_APP_FAIL,t.LOAD_APP_PROGRESS=r.LOAD_APP_PROGRESS,t.LOAD_APP_SUCCESS=r.LOAD_APP_SUCCESS,t.loadApplicationBase=r.loadApplicationBase;var i=n(16);t.UPDATE_ITEMS=i.UPDATE_ITEMS,t.FILTER_ITEMS=i.FILTER_ITEMS,t.filterItems=i.filterItems,t.updateItems=i.updateItems;var o=n(17);t.PUSH=o.PUSH,t.HASH_CHANGE=o.HASH_CHANGE,t.push=o.push,t.hashChange=o.hashChange},function(t,n){t.exports=e},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var i={"360 VR Experience":"file","App Builder Extension":"file",Application:"file","ArcGIS Pro Add In":"file","ArcGIS Pro Configuration":"file","ArcPad Package":"file","CAD Drawing":"file",CSV:"file","CSV Collection":"file","CityEngine Web Scene":"file","Code Sample":"file",Dashboard:"file","Desktop Add In":"file","Desktop Application":"file","Desktop Application Template":"file","Desktop Style":"file","Document Link":"file","Explorer Add In":"file","Explorer Layer":"file","Explorer Map":"file","Feature Collection":"file","Feature Service":"file","File Geodatabase":"file",GeoJson:"file","Geocoding Service":"file","Geodata Service":"file","Geometry Service":"file","Geoprocessing Package":"file","Geoprocessing Sample":"file","Geoprocessing Service":"file","Globe Document":"file","Globe Service":"file",Image:"file","Image Collection":"file","Image Service":"file","Insights Workbook":"file",KML:"file","KML Collection":"file",Layer:"file","Layer Package":"file",Layout:"file","Locator Package":"file","Map Document":"file","Map Package":"file","Map Service":"file","Map Template":"file","Microsoft Excel":"file","Microsoft Powerpoint":"file","Microsoft Word":"file","Mobile Application":"file","Mobile Basemap Package":"file","Mobile Map Package":"file","Network Analysis Service":"file","Operations Dashboard Add In":"file","Operations Dashboard Extension":"file",PDF:"file","Pro Map":"file","Project Package":"file","Project Template":"file","Published Map":"file","Raster function template":"file","Rule Package":"file","Scene Document":"file","Scene Package":"file","Scene Service":"file","Service Definition":"file",Shapefile:"file","Stream Service":"file","Task File":"file","Visio Document":"file",WFS:"file",WMS:"file",WMTS:"file","Windows Mobile Package":"file","Windows Viewer Add In":"file","Workflow Manager Service":"file","iWork Keynote":"file","iWork Numbers":"file","iWork Pages":"file"};t.default=r({},i,{"Web Map":"webmap","Web Mapping Application":"webapp","Web Scene":"webscene"})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SHOW_IN_VIEWER="SHOW_IN_VIEWER",t.SHOW_FULLSCREEN="SHOW_FULLSCREEN",t.MOUSE_OVER="MOUSE_OVER",t.MOUSE_OUT="MOUSE_OUT",t.showInViewer=function(){return{type:t.SHOW_IN_VIEWER}},t.showFullscreen=function(){return{type:t.SHOW_FULLSCREEN}},t.mouseOver=function(){return{type:t.MOUSE_OVER}},t.mouseOut=function(){return{type:t.MOUSE_OUT}}},function(e,n){e.exports=t},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(26);t.reducers=o.reducers;var a=n(5),s=n(27),l=n(28),c={compassWidget:"esri/widgets/Compass",homeWidget:"esri/widgets/Home",legendWidget:"esri/widgets/Legend",locateWidget:"esri/widgets/Locate",searchWidget:"esri/widgets/Search"},u=function(e){function t(t){var n=e.call(this,t)||this;return n.state={status:"loading",loadText:"scripts"},n.loadScripts=n.loadScripts.bind(n),n.loadMap=n.loadMap.bind(n),n.loadWidgets=n.loadWidgets.bind(n),n.loadScripts.bind(n)(),n}return r(t,e),t.prototype.render=function(){var e=this.tsx;return"loaded"===this.state.status?e("div",null):"loading"===this.state.status?e("div",null,e("div",{class:"loader is-active padding-leader-3 padding-trailer-3 center-style"},e("div",{class:"loader-bars"}),e("div",{class:"loader-text"},this.props.i18n.viewLoading[this.state.loadText]))):e("div",null,e("h3",{class:"center-style"},this.props.i18n.viewLoading.failed))},t.prototype.loadScripts=function(){var e=this;l.when(window.require,[this.props.webModule,this.props.viewModule]).then(function(t){var n=t[0],r=t[1];e.setState({loadText:"map"}),e.loadMap(n,r)},function(t){e.setState({status:"failed"})})},t.prototype.loadMap=function(e,t){var n,r=this,i=new e({portalItem:{id:this.props.id}});i.load().then(function(){return r.setState({loadText:"basemap"}),i.basemap.load()}).then(function(){r.setState({loadText:"layers"});var e=i.allLayers,t=e.map(function(e){return e.load()});return a(t.toArray())}).then(function(e){return r.setState({loadText:"widgets"}),n=new t({container:r.props.containerId,map:i}),r.loadWidgets(n)}).then(function(){n.container=r.props.containerId,r.setState({status:"loaded"})}).otherwise(function(e){r.setState({status:"failed"})})},t.prototype.loadWidgets=function(e){var t=this,n={"bottom-left":!0,"bottom-right":!0,"top-left":!0,"top-right":!0},r=Object.keys(this.props.widgets).reduce(function(e,r,i){return n[t.props.widgets[r]]&&e.push({module:c[r],position:t.props.widgets[r]}),e},[]);return l.when(window.require,r.map(function(e){return e.module})).then(function(t){return t.forEach(function(t,n){var i=new t({view:e});if(i.activeLayerInfos)return void i.watch("activeLayerInfos.length",function(){e.ui.add(i,r[n].position)});e.ui.add(i,r[n].position)}),s.resolve()})},t}(i.default);t.default=u},function(e,t,n){e.exports=n(8)},function(e,t,n){"use strict";var r=n(9),i=n(10);e.exports=function(e,t,n){var o=new r({config:JSON.parse(e),settings:JSON.parse(t)});new i.default({boilerplate:o,i18n:n}).container="viewDiv"}},function(e,t){e.exports=n},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__decorate||function(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(t,"__esModule",{value:!0});var o=n(11),a=n(12),s=n(13),l=n(40),c=n(0),u=c.middlewares.thunk,p=(c.middlewares.debug,function(e){function t(t){var n=e.call(this)||this;return n.minimalGallery=new s.default(c.newStore({reducers:s.reducers,parentWidget:n,initialState:{base:{applicationBase:t.boilerplate,applicationBaseResult:null,i18n:t.i18n,status:"loading",loadMessage:"init"}},middlewares:[u,l.router]})),l.startHistoryListener(n.minimalGallery.store),n}return r(t,e),t.prototype.render=function(){return this.minimalGallery.render()},t=i([o.subclass("esri.widgets.MinimalGallery")],t)}(o.declared(a)));t.default=p},function(e,t){e.exports=r},function(e,t){e.exports=i},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(1),a=n(18),s=n(19),l=n(23),c=n(32),u=n(33);t.reducers=u.reducers;var p=function(e){function t(t){var n=e.call(this,t)||this;return n.state={status:"loading",loadMessage:"init"},n.dispatch(o.loadApplicationBase()),n}return r(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.base.i18n,n=this.props.base.status;return"loading"===n?e("div",null,e("div",{class:"loader is-active padding-leader-3 padding-trailer-3 center-style",key:"loader"},e("div",{class:"loader-bars"}),e("div",{bind:this,class:"loader-text"},t.appLoading[this.state.loadMessage]))):"success"===n?e("div",null,e(a.default,{key:"minimal-gallery-header"}),e(s.default,{key:"minimal-gallery"}),e(l.default,{key:"minimal-gallery-viewer"}),e(c.default,{key:"minimal-gallery-pager"})):e("div",null,e("h3",{class:"center-style"},t.appLoading.failed))},t}(i.default);t.default=p},function(e,t){e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SAVE_APP_BASE_RESULT="SAVE_APP_BASE_RESULT",t.LOAD_APP_FAIL="LOAD_APP_FAIL",t.LOAD_APP_PROGRESS="LOAD_APP_PROGRESS",t.LOAD_APP_SUCCESS="LOAD_APP_FINISH";var r=n(5),i=n(1),o=n(3);t.loadApplicationBase=function(){return function(e,t){t().base.applicationBase.load().then(function(t){return e(a(t))},function(t){return e(l(t))},function(t){return e(c(t))})}};var a=function(e){return function(t,n){t(s(e));var a=n(),c=a.base.applicationBase,p=e.config;c.queryGroupItems(p.group,{num:100,sortField:p.sortField?p.sortField:"num-views",sortOrder:p.sortOrder?p.sortOrder:"desc",start:0}).then(function(e){var n=e.results.map(function(e){return e.load()});r(n).then(function(e){a.router.hash;t(i.updateItems(e.filter(function(e){return o.default[e.type]}))),t(i.hashChange(window.location.hash.slice(1))),t(u())},function(e){return t(l(e))})},function(e){return t(l(e))})}},s=function(e){return{type:t.SAVE_APP_BASE_RESULT,payload:e}},l=function(e){return{type:t.LOAD_APP_FAIL,payload:e}},c=function(e){return{type:t.LOAD_APP_PROGRESS,payload:e.status}},u=function(){return{type:t.LOAD_APP_SUCCESS}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UPDATE_ITEMS="UPDATE_ITEMS",t.FILTER_ITEMS="FILTER_ITEMS",t.updateItems=function(e){return{type:t.UPDATE_ITEMS,payload:e}},t.filterItems=function(e){return{type:t.FILTER_ITEMS,payload:e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PUSH="ROUTER/PUSH",t.LOCATION_CHANGE="ROUTER/LOCATION_CHANGE",t.HASH_CHANGE="ROUTER/HASH_CHANGE",t.push=function(e){return{type:t.PUSH,payload:e}},t.hashChange=function(e){return{type:t.HASH_CHANGE,payload:e}}},function(e,t,n){"use strict";function r(e){return 0===e.indexOf("http")?e:"http://"+e}var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(1),s=function(e){function t(t){var n=e.call(this,t)||this;return n.state={searchTerm:n.props.filter},n.handleSearch=n.handleSearch.bind(n),n.handleSearchChange=n.handleSearchChange.bind(n),n}return i(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.base.applicationBaseResult.config,n=t.headerSearch?e("nav",{class:"class-top-nav-list right",role:"navigation",title:"usernav"},e("form",{class:"inline-block padding-leader-half",role:"search",onsubmit:this.handleSearch},e("input",{title:t.searchPlaceholder,type:"search",placeholder:t.searchPlaceholder,name:"q",value:this.state.searchTerm,style:"margin-top: -1px;",oninput:this.handleSearchChange}),e("button",{type:"submit",class:"hide"},t.searchPlaceholder))):null,i=t.headerSearch?e("nav",{class:"class-top-nav-list right",role:"navigation",title:"usernav"},e("form",{class:"inline-block padding-leader-half",role:"search",onsubmit:this.handleSearch},e("input",{title:t.searchPlaceholder,type:"search",placeholder:t.searchPlaceholder,name:"q",value:this.state.searchTerm,style:"margin-top: -1px;",oninput:this.handleSearchChange}),e("button",{type:"submit",class:"hide"},t.searchPlaceholder))):null,o=t.headerImage?e("img",{src:t.headerImageLocation,class:"header-image",alt:t.headerText}):null,a=t.showAgolLink?e("a",{class:"top-nav-link",href:r(t.agolLinkLocation.replace("${GROUP_ID}",t.group)),style:"color: "+t.headerTextColor,title:t.agolLinkText},t.agolLinkText):null;return e("header",{class:"top-nav fade-in",style:"background-color: "+t.headColor},e("div",{class:"grid-container"},e("div",{class:"column-24"},e("div",{class:"tablet-hide"},e("a",{href:t.headerTextURL},o,e("a",{class:"top-nav-title",style:"color: "+t.headerTextColor},t.headerText)),n,a),e("div",{class:"tablet-show top-nav-flex"},e("header",{class:"top-nav-flex-title"},e("a",{href:t.headerTextURL},e("a",{class:"top-nav-title",style:"color: "+t.headerTextColor},t.headerText)),i)))))},t.prototype.componentWillReceiveProps=function(e){e.filter!==this.state.searchTerm&&this.setState({searchTerm:e.filter})},t.prototype.handleSearch=function(e){e.preventDefault();var t=this.state.searchTerm.length>0?"query="+this.state.searchTerm:"";this.dispatch(a.push(""+t))},t.prototype.handleSearchChange=function(e){this.setState({searchTerm:e.target.value})},t}(o.default);t.default=s},function(e,t,n){"use strict";function r(e,t){return e.reduce(function(e,n){return e[e.length-1].length<t?e[e.length-1].push(n):e.push([n]),e},[[]])}var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),a=n(0),s=n(20),l=n(4),c=n(1),u=n(3),p=a.middlewares.addListener,d=function(e){function t(t){var n=e.call(this,t)||this,i=n.props.base.applicationBaseResult.config.itemsPerPage;return n.state={itemPages:r(n.props.items.filteredItems,i)},n.mapItemsToChildren=n.mapItemsToChildren.bind(n),n.handleChildUpdate=n.handleChildUpdate.bind(n),n.showInViewer=n.showInViewer.bind(n),n}return i(t,e),t.prototype.render=function(){var e=this.tsx;return this.props.viewer.fullscreen?null:e("div",{class:"grid-container leader-1"},e("div",{class:"column-24"},e("div",{class:"block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up"},this.mapItemsToChildren())))},t.prototype.shouldComponentUpdate=function(e){return e.items.displayKey!==this.props.items.displayKey},t.prototype.componentWillReceiveProps=function(e){if(e.items.displayKey!==this.props.items.displayKey){var t=this.props.base.applicationBaseResult.config.itemsPerPage;this.setState({itemPages:r(e.items.filteredItems,t)})}},t.prototype.mapItemsToChildren=function(){var e=this,t=this.tsx,n=this.state.itemPages[this.props.page-1];return this.childComponents=n.reduce(function(t,n){return e.childComponents[n.id]&&(t[n.id]=e.childComponents[n.id]),t},{}),n.map(function(n){return t(s.default,{key:n.id,store:{reducers:s.reducers,initialState:{applicationBaseResult:e.props.base.applicationBaseResult,i18n:e.props.base.i18n,item:n,itemType:u.default[n.type]},middlewares:[p(e.handleChildUpdate)]}})})},t.prototype.handleChildUpdate=function(e,t){switch(e.type){case l.SHOW_IN_VIEWER:this.showInViewer(t.item.id);break;case l.SHOW_FULLSCREEN:this.showFullscreen(t.item.id)}},t.prototype.showInViewer=function(e){var t=this.props.router.hash,n=o.queryToObject(t);n.viewer=e,this.dispatch(c.push(o.objectToQuery(n)))},t.prototype.showFullscreen=function(e){var t=this.props.router.hash,n=o.queryToObject(t);n.viewer=e,n.fullscreen=!0,this.dispatch(c.push(o.objectToQuery(n)))},t}(a.default);t.default=d},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(21),a=n(4),s=n(22);t.reducers=s.reducers;var l=function(e){function t(t){var n=e.call(this,t)||this;return n.state={panelType:n.props.getPanelType(n.props.item.type)},n.handleMouseOver=n.handleMouseOver.bind(n),n.handleMouseOut=n.handleMouseOut.bind(n),n.handleItemClick=n.handleItemClick.bind(n),n.handleMaxClick=n.handleMaxClick.bind(n),n}return r(t,e),t.prototype.render=function(){var e,t=this.tsx,n=this.props.i18n,r=this.props.applicationBaseResult.config,i=r.showAuthor?t("p",{class:"font-size--1 card-last hug-bottom author-text",key:this.props.item.title+"-author"},this.props.item.owner):null;r.showSummaryTooltip&&(e=this.props.item.snippet?this.props.item.snippet:null)&&e.length>r.tooltipTruncLength&&(e=e.slice(0,r.tooltipTruncLength)+"...");var a,s;r.showItemSummary&&(a=this.props.item.snippet?this.props.item.snippet:null,a&&a.length>r.summaryTruncLength&&(a=a.slice(0,r.summaryTruncLength)+"..."),s=t("p",{class:"item-description-text"},a));var l;r.showItemPageLink&&(l=t("a",{class:"open-out-icon btn btn-transparent toolbar-tooltip","aria-label":e||n.ui.itemExtTip,href:this.props.applicationBaseResult.portal.url+"/home/item.html?id="+this.props.item.id,style:"color: "+r.buttonBgColor,key:this.props.item.title+"-info-icon",tabindex:"0"},t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32",style:"\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        "},t("path",{d:"M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z"}))));var c;"file"===this.props.itemType||r.alwaysOpenFullscreen||(c=t("a",{class:"open-out-icon btn btn-transparent toolbar-tooltip","aria-label":n.ui[this.state.panelType+"ExtTip"],style:"color: "+r.buttonBgColor,key:this.props.item.title+"-open-out-icon",onclick:this.handleMaxClick,tabindex:"0"},t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32",style:"\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        "},t("path",{d:"M2 4v24h28V4H2zm26 22H4V10h24v16z"}))));var u,p="file"===this.props.itemType?n.ui.itemExtTip:r.alwaysOpenFullscreen?n.ui[this.state.panelType+"ExtTip"]:n.ui.galleryTip;return r.showItemTitle&&(u=t("a",{title:p,style:"color: "+r.linkColor,class:"break-word"},t("h5",{tabindex:"0",class:"clickable"},this.props.item.title))),t("div",{class:"card block trailer-1 animate-fade-in card-fade",style:"background-color: "+r.cardColor+"; z-index: 1000",key:this.props.item.id+"-div"},t("figure",{class:"card-image-wrap"},t("a",{title:p,role:"link",tabindex:"0"},t("img",{key:this.props.item.id+"-thumbnail",class:"card-image clickable thumbnail-min",src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",alt:this.props.item.title,onmouseover:this.handleMouseOver,onmouseout:this.handleMouseOut,onclick:this.handleItemClick,style:"\n                                background-image: url("+this.props.item.thumbnailUrl+");\n                                background-repeat: no-repeat;\n                                background-size: cover;\n                            "})),t(o.default,{key:"card-caption"})),t("div",{class:"card-content",style:"color: "+r.fontColor},u,s,i,t("div",{class:"open-out-container"},l,c)))},t.prototype.handleMouseOver=function(){this.dispatch(a.mouseOver())},t.prototype.handleMouseOut=function(){this.dispatch(a.mouseOut())},t.prototype.handleItemClick=function(){"file"===this.props.itemType?window.open(this.props.applicationBaseResult.portal.url+"/home/item.html?id="+this.props.item.id,"_blank"):this.props.applicationBaseResult.config.alwaysOpenFullscreen?this.handleMaxClick():this.dispatch(a.showInViewer())},t.prototype.handleMaxClick=function(){this.props.applicationBaseResult.config.openFullscreenSeparateTab?"webapp"===this.props.itemType?window.open(this.props.item.url,"_blank"):window.open(""+window.location.origin+window.location.pathname+"?viewer="+this.props.item.id+"&fullscreen=true","_blank"):"webapp"===this.props.itemType?window.location.href=this.props.item.url:this.dispatch(a.showFullscreen())},t}(i.default);t.default=l},function(e,t,n){"use strict";function r(e,t){return e=e.replace("#",""),"rgba("+parseInt(e.substring(0,2),16)+","+parseInt(e.substring(2,4),16)+","+parseInt(e.substring(4,6),16)+","+t/100+")"}var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t){var n=e.call(this,t)||this;return n.state={captionBelowOpacity:.8,captionOpacity:1,captionTransform:0,panelType:n.props.getPanelType(n.props.item.type)},n}return i(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.applicationBaseResult.config;return t.showItemType?t.itemTypeBelowThumbnail?e("div",{class:"card-below-image-caption",style:"\n                            opacity: "+this.state.captionBelowOpacity+";\n                            background-color: "+r(t[this.state.panelType+"CaptionColor"],80)+";\n                            color: "+t.captionTextColor+";\n                        "},this.props.item.displayName):e("div",{class:"card-image-caption",style:"\n                            opacity: "+this.state.captionOpacity+";\n                            transform: translate(0, "+this.state.captionTransform+"%);\n                            background-color: "+r(t[this.state.panelType+"CaptionColor"],80)+";\n                            color: "+t.captionTextColor+";\n                        "},this.props.item.displayName):null},t.prototype.componentWillReceiveProps=function(e){e.hovering!==this.props.hovering&&this.setState({captionBelowOpacity:e.hovering?1:.8,captionOpacity:e.hovering?0:1,captionTransform:e.hovering?100:0})},t}(o.default);t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(4),o=function(e){return void 0===e&&(e={}),e},a=function(e){return void 0===e&&(e={}),e},s=function(e){return void 0===e&&(e={}),e},l=function(e){return void 0===e&&(e="file"),e},c=function(e){return void 0===e&&(e=function(e){var t={"Web Mapping Application":"app","Web Map":"map","Web Scene":"scene"};return t[e]?t[e]:"file"}),e},u=function(e,t){switch(void 0===e&&(e=!1),t.type){case i.MOUSE_OVER:return!0;case i.MOUSE_OUT:return!1;default:return e}};t.reducers=r.combineReducers({applicationBaseResult:o,i18n:a,item:s,hovering:u,getPanelType:c,itemType:l})},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=n(0),a=n(1),s=n(24),l=n(31),c=n(3),u=function(e){function t(t){var n=e.call(this,t)||this;return n.state={containerClasses:{"animate-fade-in":!0,"animate-fade-out":!1}},n.handleExitClick=n.handleExitClick.bind(n),n.closeViewer=n.closeViewer.bind(n),n}return r(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.base.i18n,n=this.props.base.applicationBaseResult.config,r=this.props.items.viewerItem;if(this.props.viewer.visible&&r.id){var i=c.default[r.type],o=void 0;if("webmap"===i)o=e(s.MapView,{key:r.id});else if("webscene"===i)o=e(s.SceneView,{key:r.id});else{if("webapp"!==i)return null;o=e(s.AppView,{key:r.id})}return this.props.viewer.fullscreen?e("div",{id:"map-container",class:"map-container fullscreen",key:"map-container-fullscreen-"+r.id},o):e("div",{id:"view-container",key:"view-container",classes:this.state.containerClasses,style:"background-color: "+l.default(n.bgColor,85)},e("div",{id:"map-container",class:"map-container",key:"map-container-"+r.id},o,e("button",{class:"btn btn-clear view-exit-button clickable",onclick:this.handleExitClick,title:t.ui.close},e("span",{class:"icon-ui-close view-exit-icon"}))))}return null},t.prototype.componentWillReceiveProps=function(e){e.viewer.visible||(this.childComponents={})},t.prototype.handleExitClick=function(){var e=this;this.setState({containerClasses:{"animate-fade-in":!1,"animate-fade-out":!0}}),setTimeout(function(){e.closeViewer(),e.setState({containerClasses:{"animate-fade-in":!0,"animate-fade-out":!1}})},750)},t.prototype.closeViewer=function(){var e=this.props.router.hash,t=i.queryToObject(e);delete t.viewer,this.dispatch(a.push(i.objectToQuery(t)))},t}(o.default);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(25);t.MapView=r.MapView;var i=n(29);t.AppView=i.AppView;var o=n(30);t.SceneView=o.SceneView},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(6),s=function(e){function t(t){return e.call(this,t)||this}return r(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.base.applicationBaseResult.config;return e(a.default,{key:"map-view",store:{reducers:a.reducers,initialState:{config:t,i18n:this.props.base.i18n,id:this.props.items.viewerItem.id,widgets:Object.keys(t).filter(function(e){return-1!==e.indexOf("Widget")}).reduce(function(e,n){return i({},e,(r={},r[n]=t[n],r));var r},{}),viewModule:"esri/views/MapView",webModule:"esri/WebMap",containerId:"map-container"}}})},t}(o.default);t.MapView=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={config:{},i18n:{},id:"",widgets:{},viewModule:"",webModule:"",containerId:"map-container"};t.reducers=function(e,t){return void 0===e&&(e=r),e}},function(e,t){e.exports=a},function(e,t){e.exports=s},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=function(e){function t(t){return e.call(this,t)||this}return r(t,e),t.prototype.render=function(){var e=this.tsx;return e("iframe",{src:this.props.items.viewerItem.url,class:"app-frame",id:"embedded-mapping-application-iframe",name:"nested-iframe"},e("h3",{class:"center-style"},this.props.base.i18n.viewLoading.iframe))},t}(i.default);t.AppView=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(6),s=function(e){function t(t){return e.call(this,t)||this}return r(t,e),t.prototype.render=function(){var e=this.tsx,t=this.props.base.applicationBaseResult.config;return e(a.default,{key:"map-view",store:{reducers:a.reducers,initialState:{config:t,i18n:this.props.base.i18n,id:this.props.items.viewerItem.id,widgets:Object.keys(t).filter(function(e){return-1!==e.indexOf("Widget")}).reduce(function(e,n){return i({},e,(r={},r[n]=t[n],r));var r},{}),viewModule:"esri/views/SceneView",webModule:"esri/WebScene",containerId:"map-container"}}})},t}(o.default);t.SceneView=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return e=e.replace("#",""),"rgba("+parseInt(e.substring(0,2),16)+","+parseInt(e.substring(2,4),16)+","+parseInt(e.substring(4,6),16)+","+t/100+")"}},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=n(0),a=n(1),s=function(e){function t(t){var n=e.call(this,t)||this;return n.handleNext=n.handleNext.bind(n),n.handlePrevious=n.handlePrevious.bind(n),n.handlePageButton=n.handlePageButton.bind(n),n.handlePage=n.handlePage.bind(n),n}return r(t,e),t.prototype.render=function(){var e=this,t=this.tsx,n=this.props.base.applicationBaseResult.config,r=this.props.items.filteredItems,i=Math.ceil(r.length/n.itemsPerPage),o={btn:!0,"btn-disabled":this.props.page<=1,"btn-transparent":!0},a={btn:!0,"btn-arrow":!0,"btn-disabled":this.props.page>=i,"btn-transparent":!0},s=Array.apply(null,Array(i)).map(function(r,i){var o=e.props.page===i+1;return t("a",{id:"page-"+(i+1)+"-button",title:"page-"+(i+1),class:"btn"+(o?"":" btn-transparent"),onclick:e.handlePageButton,role:"link",tabindex:"0",style:"\n                        color: "+(o?n.buttonTextColor:n.buttonBgColor)+";\n                        background-color: "+(o?n.buttonBgColor:null)+";\n                        border: "+(o?"1px solid "+n.buttonBgColor:"none")+"\n                    ",key:"page-button-"+(i+1)+"-"+e.props.items.displayKey},i+1)});return t("div",{class:"text-center trailer-1 leader-1",key:"pager"},t("a",{id:"previous",title:"previous",classes:o,role:"link",tabindex:"0",style:"color:"+n.buttonBgColor+";",key:"previous-button",onclick:this.handlePrevious},"Previous"),s,t("a",{id:"next",title:"next",classes:a,role:"link",tabindex:"0",style:"color:"+n.buttonBgColor+";",key:"next-button",onclick:this.handleNext},"Next"))},t.prototype.handleNext=function(){this.handlePage(this.props.page+1)},t.prototype.handlePrevious=function(){this.handlePage(this.props.page-1)},t.prototype.handlePageButton=function(e){this.handlePage(e.target.text)},t.prototype.handlePage=function(e){var t=this.props.router.hash,n=i.queryToObject(t);e>1?n.page=e:n.page&&delete n.page,this.dispatch(a.push(i.objectToQuery(n)))},t}(o.default);t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(34),o=n(35),a=n(36),s=n(37),l=n(38),c=n(39);t.reducers=r.combineReducers({base:i.default,items:o.default,router:a.default,filter:s.default,page:l.default,viewer:c.default})},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.default=function(e,t){switch(t.type){case i.SAVE_APP_BASE_RESULT:return r({},e,{loadMessage:"groupItems",applicationBaseResult:t.payload});case i.LOAD_APP_FAIL:return r({},e,{status:"failed"});case i.LOAD_APP_PROGRESS:return r({},e,{loadMessage:t.payload});case i.LOAD_APP_SUCCESS:return r({},e,{status:"success"});default:return e}}},function(e,t,n){"use strict";function r(e,t){return e.filter(function(e){return-1!==e.title.toLowerCase().indexOf(t)||-1!==e.type.toLowerCase().indexOf(t)||-1!==e.owner.toLowerCase().indexOf(t)||e.tags&&-1!==e.tags.map(function(e){return e.toLowerCase()}).indexOf(t)||e.description&&-1!==e.description.indexOf(t)})}var i=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),a=n(1),s={allItems:[],filteredItems:[],displayKey:"",viewerItem:{}};t.default=function(e,t){switch(void 0===e&&(e=s),t.type){case a.UPDATE_ITEMS:return i({},e,{allItems:t.payload});case a.HASH_CHANGE:var n=o.queryToObject(t.payload);if(n.viewer){var l=e.allItems.filter(function(e){return e.id===n.viewer})[0];return i({},e,{viewerItem:l||{},filteredItems:r(e.allItems,n.query?n.query:""),displayKey:Math.random().toString(36).substring(7)})}return i({},e,{filteredItems:r(e.allItems,n.query?n.query:""),displayKey:Math.random().toString(36).substring(7)});default:return e}}},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o={hash:""};t.default=function(e,t){switch(void 0===e&&(e=o),t.type){case i.HASH_CHANGE:return r({},e,{hash:t.payload});default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),i=n(1);t.default=function(e,t){switch(void 0===e&&(e=""),t.type){case i.HASH_CHANGE:var n=r.queryToObject(t.payload);return n.query?n.query:"";default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),i=n(1);t.default=function(e,t){switch(void 0===e&&(e=1),t.type){case i.HASH_CHANGE:var n=r.queryToObject(t.payload);return n.page?parseInt(n.page,10):1;default:return e}}},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e};Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),o=n(1),a={visible:!1,fullscreen:!1};t.default=function(e,t){switch(void 0===e&&(e=a),t.type){case o.HASH_CHANGE:var n=i.queryToObject(t.payload);return n.viewer?r({},e,{visible:!0,fullscreen:!!n.fullscreen}):r({},e,{visible:!1,fullscreen:!1});default:return e}}},function(e,t,n){"use strict";function r(e){e.dispatch(i.hashChange(window.location.hash.slice(1))),window.onhashchange=function(t){e.dispatch(i.hashChange(window.location.hash.slice(1)))}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);t.router=function(){return function(e){return function(t){switch(t.type){case i.PUSH:window.location.hash=t.payload;break;default:return e(t)}}}},t.startHistoryListener=r}])});
//# sourceMappingURL=application.js.map