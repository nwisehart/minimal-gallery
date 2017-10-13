define(["dojo/io-query","dojo/promise/all","esriApplicationBase/ApplicationBase","esri/core/accessorSupport/decorators","esri/widgets/Widget","esri/widgets/support/widget","esri/core/promiseUtils","esri/core/requireUtils"], function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_28__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = __webpack_require__(14);
var Component = /** @class */ (function () {
    function Component(store) {
        /** Child components defined in this component's render function */
        this.childComponents = {};
        /** Indicates whether a component needs to re-render, or can simply return precalculated vdom */
        this.dirty = true;
        this.store = store;
        this.props = store.getState();
        this.tsx = this.tsx.bind(this);
        this.updateProps = this.updateProps.bind(this);
        store.subscribe(this.updateProps);
    }
    /** tsx function required to render child components */
    Component.prototype.tsx = function (element, properties, children) {
        if (typeof element === "string") {
            return widget_1.tsx.apply(this, arguments);
        }
        else {
            if (properties && properties.key) {
                var child = this.childComponents[properties.key];
                if (child) {
                    if (child.dirty) {
                        child.renderResult = child.render();
                    }
                    return child.renderResult;
                }
                else {
                    this.childComponents[properties.key] = new element(properties.store ? newStore(__assign({}, properties.store, { parentWidget: this.store.parentWidget })) :
                        this.store, properties.key);
                    this.childComponents[properties.key].renderResult = this.childComponents[properties.key].render();
                    return this.childComponents[properties.key].renderResult;
                }
            }
            else {
                throw new Error("Custom components must each have a unique key property.");
            }
        }
    };
    /** Returns a VNode, needs to be implemented by component creator */
    Component.prototype.render = function () { };
    /** Called before a component's props are updated. */
    Component.prototype.componentWillReceiveProps = function (nextProps) { };
    /** Returns true by default. If false returned component will not re-render */
    Component.prototype.shouldComponentUpdate = function (nextProps) {
        return true;
    };
    /** Updates the private state of the component */
    Component.prototype.setState = function (newState) {
        this.state = __assign({}, this.state, newState);
        this.store.parentWidget.scheduleRender();
    };
    /** Dispatches an action to the component's store */
    Component.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    /** Used behind the scenes to sync a component's props with the current application state */
    Component.prototype.updateProps = function (nextProps) {
        this.componentWillReceiveProps(nextProps);
        this.dirty = this.shouldComponentUpdate(nextProps);
        this.props = nextProps;
    };
    return Component;
}());
exports.default = Component;
/** Creates a new store of application state */
function newStore(storeParams) {
    if (storeParams.middlewares) {
        return applyMiddleware.apply(void 0, storeParams.middlewares)(createStore)(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
    }
    return createStore(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
}
exports.newStore = newStore;
/** Combines reducers to allow composition */
function combineReducers(reducers) {
    var finalReducers = pick(reducers, function (val) { return typeof val === 'function'; });
    return function (state, action) {
        if (state === void 0) { state = {}; }
        return mapValues(finalReducers, function (reducer, key) { return reducer(state[key], action); });
    };
}
exports.combineReducers = combineReducers;
function createStore(reducers, parentWidget, initialState) {
    var state;
    if (initialState) {
        state = initialState;
    }
    var subscribers = [];
    var store = {
        parentWidget: parentWidget,
        dispatch: function (action) {
            state = reducers(state, action);
            subscribers.forEach(function (handler) { return handler(state); });
            parentWidget.scheduleRender();
        },
        subscribe: function (handler) {
            subscribers.push(handler);
            return function unsubscribe() {
                var index = subscribers.indexOf(handler);
                subscribers.splice(index, 1);
            };
        },
        getState: function () {
            return state;
        }
    };
    store.dispatch({ type: "INITIALIZE" });
    return store;
}
function applyMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (next) { return function (reducer, parentWidget, initialState) {
        var store = next(reducer, parentWidget, initialState);
        var dispatch = store.dispatch;
        var chain = [];
        chain = middlewares.map(function (middleware) { return middleware({
            getState: store.getState,
            dispatch: function (action) { return dispatch(action); }
        }); });
        dispatch = compose.apply(void 0, chain)(store.dispatch);
        return __assign({}, store, { dispatch: dispatch });
    }; };
}
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (arg) { return funcs.reduceRight(function (composed, f) { return f(composed); }, arg); };
}
function mapValues(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}
function pick(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        if (fn(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/** Available Redux middlewares */
exports.middlewares = {
    /** Asynchronous control flow using thunks */
    thunk: function (params) { return function (next) { return function (action) {
        if (typeof action === "function") {
            return action(params.dispatch, params.getState);
        }
        return next(action);
    }; }; },
    /** Log dispatch and next state to the console */
    debug: function (params) { return function (next) { return function (action) {
        console.log(action.type, action);
        var result = next(action);
        console.log('next state', params.getState());
        return result;
    }; }; },
    /** Send actions and resulting state to a listener */
    addListener: function (listener) {
        return function (params) { return function (next) { return function (action) {
            var result = next(action);
            listener(action, params.getState());
            return result;
        }; }; };
    }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(15);
exports.SAVE_APP_BASE_RESULT = base_1.SAVE_APP_BASE_RESULT;
exports.LOAD_APP_FAIL = base_1.LOAD_APP_FAIL;
exports.LOAD_APP_PROGRESS = base_1.LOAD_APP_PROGRESS;
exports.LOAD_APP_SUCCESS = base_1.LOAD_APP_SUCCESS;
exports.loadApplicationBase = base_1.loadApplicationBase;
var items_1 = __webpack_require__(16);
exports.UPDATE_ITEMS = items_1.UPDATE_ITEMS;
exports.FILTER_ITEMS = items_1.FILTER_ITEMS;
exports.filterItems = items_1.filterItems;
exports.updateItems = items_1.updateItems;
var router_1 = __webpack_require__(17);
exports.PUSH = router_1.PUSH;
exports.LOCATION_CHANGE = router_1.LOCATION_CHANGE;
exports.push = router_1.push;
exports.locationChange = router_1.locationChange;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileTypes = {
    "360 VR Experience": "file",
    "App Builder Extension": "file",
    "Application": "file",
    "ArcGIS Pro Add In": "file",
    "ArcGIS Pro Configuration": "file",
    "ArcPad Package": "file",
    "CAD Drawing": "file",
    "CSV": "file",
    "CSV Collection": "file",
    "CityEngine Web Scene": "file",
    "Code Sample": "file",
    "Dashboard": "file",
    "Desktop Add In": "file",
    "Desktop Application": "file",
    "Desktop Application Template": "file",
    "Desktop Style": "file",
    "Document Link": "file",
    "Explorer Add In": "file",
    "Explorer Layer": "file",
    "Explorer Map": "file",
    "Feature Collection": "file",
    "Feature Service": "file",
    "File Geodatabase": "file",
    "GeoJson": "file",
    "Geocoding Service": "file",
    "Geodata Service": "file",
    "Geometry Service": "file",
    "Geoprocessing Package": "file",
    "Geoprocessing Sample": "file",
    "Geoprocessing Service": "file",
    "Globe Document": "file",
    "Globe Service": "file",
    "Image": "file",
    "Image Collection": "file",
    "Image Service": "file",
    "Insights Workbook": "file",
    "KML": "file",
    "KML Collection": "file",
    "Layer": "file",
    "Layer Package": "file",
    "Layout": "file",
    "Locator Package": "file",
    "Map Document": "file",
    "Map Package": "file",
    "Map Service": "file",
    "Map Template": "file",
    "Microsoft Excel": "file",
    "Microsoft Powerpoint": "file",
    "Microsoft Word": "file",
    "Mobile Application": "file",
    "Mobile Basemap Package": "file",
    "Mobile Map Package": "file",
    "Network Analysis Service": "file",
    "Operations Dashboard Add In": "file",
    "Operations Dashboard Extension": "file",
    "PDF": "file",
    "Pro Map": "file",
    "Project Package": "file",
    "Project Template": "file",
    "Published Map": "file",
    "Raster function template": "file",
    "Rule Package": "file",
    "Scene Document": "file",
    "Scene Package": "file",
    "Scene Service": "file",
    "Service Definition": "file",
    "Shapefile": "file",
    "Stream Service": "file",
    "Task File": "file",
    "Visio Document": "file",
    "WFS": "file",
    "WMS": "file",
    "WMTS": "file",
    "Windows Mobile Package": "file",
    "Windows Viewer Add In": "file",
    "Workflow Manager Service": "file",
    "iWork Keynote": "file",
    "iWork Numbers": "file",
    "iWork Pages": "file",
};
exports.default = __assign({}, fileTypes, { "Web Map": "webmap", "Web Mapping Application": "webapp", "Web Scene": "webscene" });


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_IN_VIEWER = "SHOW_IN_VIEWER";
exports.SHOW_FULLSCREEN = "SHOW_FULLSCREEN";
exports.MOUSE_OVER = "MOUSE_OVER";
exports.MOUSE_OUT = "MOUSE_OUT";
exports.showInViewer = function () { return ({
    type: exports.SHOW_IN_VIEWER
}); };
exports.showFullscreen = function () { return ({
    type: exports.SHOW_FULLSCREEN
}); };
exports.mouseOver = function () { return ({
    type: exports.MOUSE_OVER
}); };
exports.mouseOut = function () { return ({
    type: exports.MOUSE_OUT
}); };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _reducers_1 = __webpack_require__(26);
exports.reducers = _reducers_1.reducers;
var all = __webpack_require__(5);
var promiseUtils = __webpack_require__(27);
var requireUtils = __webpack_require__(28);
var widgetKey = {
    compassWidget: "esri/widgets/Compass",
    homeWidget: "esri/widgets/Home",
    legendWidget: "esri/widgets/Legend",
    locateWidget: "esri/widgets/Locate",
    searchWidget: "esri/widgets/Search"
};
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            status: "loading",
            loadText: "scripts"
        };
        _this.loadScripts = _this.loadScripts.bind(_this);
        _this.loadMap = _this.loadMap.bind(_this);
        _this.loadWidgets = _this.loadWidgets.bind(_this);
        _this.loadScripts.bind(_this)();
        return _this;
    }
    ViewBase.prototype.render = function () {
        var tsx = this.tsx;
        if (this.state.status === "loaded") {
            return tsx("div", null);
        }
        else if (this.state.status === "loading") {
            return (tsx("div", null,
                tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style" },
                    tsx("div", { class: "loader-bars" }),
                    tsx("div", { class: "loader-text" }, this.props.i18n.viewLoading[this.state.loadText]))));
        }
        return (tsx("div", null,
            tsx("h3", { class: "center-style" }, this.props.i18n.viewLoading.failed)));
    };
    ViewBase.prototype.loadScripts = function () {
        var _this = this;
        requireUtils.when(window["require"], [this.props.webModule, this.props.viewModule])
            .then(function (_a) {
            var WebConstructor = _a[0], ViewConstructor = _a[1];
            _this.setState({ loadText: "map" });
            _this.loadMap(WebConstructor, ViewConstructor);
        }, function (err) {
            _this.setState({ status: "failed" });
        });
    };
    ViewBase.prototype.loadMap = function (WebConstructor, ViewConstructor) {
        var _this = this;
        var view;
        var map = new WebConstructor({
            portalItem: {
                id: this.props.id
            }
        });
        map.load().then(function () {
            _this.setState({ loadText: "basemap" });
            return map.basemap.load();
        }).then(function () {
            _this.setState({ loadText: "layers" });
            var allLayers = map.allLayers;
            var promises = allLayers.map(function (layer) { return layer.load(); });
            return all(promises.toArray());
        }).then(function (layers) {
            _this.setState({ loadText: "widgets" });
            view = new ViewConstructor({
                container: _this.props.containerId,
                map: map
            });
            return _this.loadWidgets(view);
        }).then(function () {
            view.container = _this.props.containerId;
            _this.setState({ status: "loaded" });
        }).otherwise(function (err) {
            _this.setState({ status: "failed" });
        });
    };
    ViewBase.prototype.loadWidgets = function (view) {
        var _this = this;
        var positions = {
            "bottom-left": true,
            "bottom-right": true,
            "top-left": true,
            "top-right": true
        };
        var modules = Object.keys(this.props.widgets).reduce(function (p, c, i) {
            if (positions[_this.props.widgets[c]]) {
                p.push({
                    module: widgetKey[c],
                    position: _this.props.widgets[c]
                }); // typescript is weird
            }
            return p;
        }, []);
        return requireUtils.when(window["require"], modules.map(function (item) { return item["module"]; }))
            .then(function (constructors) {
            constructors.forEach(function (Constructor, i) {
                var widget = new Constructor({ view: view });
                if (widget.activeLayerInfos) {
                    widget.watch("activeLayerInfos.length", function () {
                        view.ui.add(widget, modules[i]["position"]);
                    });
                    return;
                }
                view.ui.add(widget, modules[i]["position"]);
            });
            return promiseUtils.resolve();
        });
    };
    return ViewBase;
}(Component_1.default));
exports.default = ViewBase;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ApplicationBase = __webpack_require__(9);
var Widget_1 = __webpack_require__(10);
module.exports = function (applicationConfigJSON, boilerplateConfigJSON, i18n) {
    var boilerplate = new ApplicationBase({
        config: JSON.parse(applicationConfigJSON),
        settings: JSON.parse(boilerplateConfigJSON)
    });
    var MainComponent = new Widget_1.default({ boilerplate: boilerplate, i18n: i18n });
    MainComponent.container = "viewDiv";
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = __webpack_require__(11);
var Widget = __webpack_require__(12);
var MinimalGallery_1 = __webpack_require__(13);
var router_1 = __webpack_require__(40);
var Component_1 = __webpack_require__(0);
var thunk = Component_1.middlewares.thunk, debug = Component_1.middlewares.debug;
var MainApp = /** @class */ (function (_super) {
    __extends(MainApp, _super);
    function MainApp(props) {
        var _this = _super.call(this) || this;
        _this.minimalGallery = new MinimalGallery_1.default(Component_1.newStore({
            reducers: MinimalGallery_1.reducers,
            parentWidget: _this,
            initialState: {
                base: {
                    applicationBase: props.boilerplate,
                    applicationBaseResult: null,
                    i18n: props.i18n,
                    status: "loading",
                    loadMessage: "init"
                }
            },
            middlewares: [thunk, router_1.router]
        }));
        router_1.startHistoryListener(_this.minimalGallery.store);
        return _this;
    }
    MainApp.prototype.render = function () {
        return this.minimalGallery.render();
    };
    MainApp = __decorate([
        decorators_1.subclass("esri.widgets.MinimalGallery")
    ], MainApp);
    return MainApp;
}(decorators_1.declared(Widget)));
exports.default = MainApp;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var Header_1 = __webpack_require__(18);
var Gallery_1 = __webpack_require__(19);
var Viewer_1 = __webpack_require__(23);
var Pager_1 = __webpack_require__(32);
var _reducers_1 = __webpack_require__(33);
exports.reducers = _reducers_1.reducers;
var MinimalGallery = /** @class */ (function (_super) {
    __extends(MinimalGallery, _super);
    function MinimalGallery(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            status: "loading",
            loadMessage: "init"
        };
        _this.dispatch(_actions_1.loadApplicationBase());
        return _this;
    }
    MinimalGallery.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var status = this.props.base.status;
        if (status === "loading") {
            return (tsx("div", null,
                tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style", key: "loader" },
                    tsx("div", { class: "loader-bars" }),
                    tsx("div", { bind: this, class: "loader-text" }, i18n.appLoading[this.state.loadMessage]))));
        }
        else if (status === "success") {
            return (tsx("div", null,
                tsx(Header_1.default, { key: "minimal-gallery-header" }),
                tsx(Gallery_1.default, { key: "minimal-gallery" }),
                tsx(Viewer_1.default, { key: "minimal-gallery-viewer" }),
                tsx(Pager_1.default, { key: "minimal-gallery-pager" })));
        }
        return (tsx("div", null,
            tsx("h3", { class: "center-style" }, i18n.appLoading.failed)));
    };
    return MinimalGallery;
}(Component_1.default));
exports.default = MinimalGallery;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_APP_BASE_RESULT = "SAVE_APP_BASE_RESULT";
exports.LOAD_APP_FAIL = "LOAD_APP_FAIL";
exports.LOAD_APP_PROGRESS = "LOAD_APP_PROGRESS";
exports.LOAD_APP_SUCCESS = "LOAD_APP_FINISH";
var all = __webpack_require__(5);
var _1 = __webpack_require__(1);
var supportedItemTypes_1 = __webpack_require__(3);
exports.loadApplicationBase = function () { return function (dispatch, getState) {
    var base = getState().base;
    base.applicationBase.load().then(function (result) { return dispatch(queryGroupItems(result)); }, function (err) { return dispatch(loadAppFail(err)); }, function (progress) { return dispatch(loadAppProgress(progress)); });
}; };
var queryGroupItems = function (applicationBaseResult) {
    return function (dispatch, getState) {
        // Boilerplate loaded properly so save it
        dispatch(saveAppBaseResult(applicationBaseResult));
        var state = getState();
        var applicationBase = state.base.applicationBase;
        var config = applicationBaseResult.config;
        applicationBase.queryGroupItems(config.group, {
            num: 100,
            sortField: (config.sortField ? config.sortField : "num-views"),
            sortOrder: (config.sortOrder ? config.sortOrder : "desc"),
            start: 0
        }).then(function (response) {
            var promises = response.results.map(function (item) { return item.load(); });
            all(promises).then(function (items) {
                var _a = state.router, search = _a.search, hash = _a.hash;
                dispatch(_1.updateItems(items.filter(function (item) { return supportedItemTypes_1.default[item.type]; })));
                dispatch(_1.push("" + search + hash));
                dispatch(loadAppSuccess());
            }, function (err) { return dispatch(loadAppFail(err)); });
        }, function (err) { return dispatch(loadAppFail(err)); });
    };
};
var saveAppBaseResult = function (applicationBaseResult) { return ({
    type: exports.SAVE_APP_BASE_RESULT,
    payload: applicationBaseResult
}); };
var loadAppFail = function (err) { return ({
    type: exports.LOAD_APP_FAIL,
    payload: err
}); };
var loadAppProgress = function (progress) { return ({
    type: exports.LOAD_APP_PROGRESS,
    payload: progress.status
}); };
var loadAppSuccess = function () { return ({
    type: exports.LOAD_APP_SUCCESS
}); };


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_ITEMS = "UPDATE_ITEMS";
exports.FILTER_ITEMS = "FILTER_ITEMS";
exports.updateItems = function (items) { return ({
    type: exports.UPDATE_ITEMS,
    payload: items
}); };
exports.filterItems = function (filter) { return ({
    type: exports.FILTER_ITEMS,
    payload: filter
}); };


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSH = "ROUTER/PUSH";
exports.LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";
exports.push = function (href) { return ({
    type: exports.PUSH,
    payload: href,
}); };
exports.locationChange = function (location) { return ({
    type: exports.LOCATION_CHANGE,
    payload: __assign({}, location)
}); };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            searchTerm: _this.props.filter
        };
        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.handleSearchChange = _this.handleSearchChange.bind(_this);
        return _this;
    }
    Header.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var headSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var tabletHeadSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var headImage = config.headerImage ? (tsx("img", { src: config.headerImageLocation, class: "header-image", alt: config.headerText })) : null;
        var agolLink = config.showAgolLink ? (tsx("a", { class: "top-nav-link", href: appendProtocol(config.agolLinkLocation.replace("${GROUP_ID}", config.group)), style: "color: " + config.headerTextColor, title: config.agolLinkText }, config.agolLinkText)) : null;
        return (tsx("header", { class: "top-nav fade-in", style: "background-color: " + config.headColor },
            tsx("div", { class: "grid-container" },
                tsx("div", { class: "column-24" },
                    tsx("div", { class: "tablet-hide" },
                        tsx("a", { href: config.headerTextURL },
                            headImage,
                            tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                        headSearch,
                        agolLink),
                    tsx("div", { class: "tablet-show top-nav-flex" },
                        tsx("header", { class: "top-nav-flex-title" },
                            tsx("a", { href: config.headerTextURL },
                                tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                            tabletHeadSearch))))));
    };
    Header.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.filter !== this.state.searchTerm) {
            this.setState({ searchTerm: nextProps.filter });
        }
    };
    Header.prototype.handleSearch = function (e) {
        e.preventDefault();
        var query = this.state.searchTerm.length > 0 ? "?q=" + this.state.searchTerm : "?";
        this.dispatch(_actions_1.push("" + query));
    };
    Header.prototype.handleSearchChange = function (e) {
        this.setState({
            searchTerm: e.target.value
        });
    };
    return Header;
}(Component_1.default));
exports.default = Header;
function appendProtocol(location) {
    if (location.indexOf("http") === 0) {
        return location;
    }
    return "http://" + location;
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var Component_1 = __webpack_require__(0);
var Panel_1 = __webpack_require__(20);
var _actions_1 = __webpack_require__(4);
var _actions_2 = __webpack_require__(1);
var supportedItemTypes_1 = __webpack_require__(3);
var addListener = Component_1.middlewares.addListener;
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(store) {
        var _this = _super.call(this, store) || this;
        var itemsPerPage = _this.props.base.applicationBaseResult.config.itemsPerPage;
        _this.state = {
            itemPages: splitToPages(_this.props.items.filteredItems, itemsPerPage)
        };
        _this.mapItemsToChildren = _this.mapItemsToChildren.bind(_this);
        _this.handleChildUpdate = _this.handleChildUpdate.bind(_this);
        _this.showInViewer = _this.showInViewer.bind(_this);
        return _this;
    }
    Gallery.prototype.render = function () {
        var tsx = this.tsx;
        if (this.props.viewer.fullscreen) {
            return null;
        }
        return (tsx("div", { class: "grid-container leader-1" },
            tsx("div", { class: "column-24" },
                tsx("div", { class: "block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up" }, this.mapItemsToChildren()))));
    };
    Gallery.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.items.displayKey !== this.props.items.displayKey;
    };
    Gallery.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.items.displayKey !== this.props.items.displayKey) {
            var itemsPerPage = this.props.base.applicationBaseResult.config.itemsPerPage;
            this.setState({
                itemPages: splitToPages(nextProps.items.filteredItems, itemsPerPage)
            });
        }
    };
    Gallery.prototype.mapItemsToChildren = function () {
        var _this = this;
        var tsx = this.tsx;
        var displayItems = this.state.itemPages[this.props.page - 1];
        this.childComponents = displayItems.reduce(function (result, item) {
            if (_this.childComponents[item.id]) {
                result[item.id] = _this.childComponents[item.id];
            }
            return result;
        }, {});
        return displayItems.map(function (item) { return (tsx(Panel_1.default, { key: item.id, store: {
                reducers: Panel_1.reducers,
                initialState: {
                    applicationBaseResult: _this.props.base.applicationBaseResult,
                    i18n: _this.props.base.i18n,
                    item: item,
                    itemType: supportedItemTypes_1.default[item.type]
                },
                middlewares: [addListener(_this.handleChildUpdate)]
            } })); });
    };
    Gallery.prototype.handleChildUpdate = function (action, childState) {
        switch (action.type) {
            case _actions_1.SHOW_IN_VIEWER:
                this.showInViewer(childState.item.id);
                break;
            case _actions_1.SHOW_FULLSCREEN:
                this.showFullscreen(childState.item.id);
                break;
            default: //
        }
    };
    Gallery.prototype.showInViewer = function (itemId) {
        var _a = this.props.router, search = _a.search, hash = _a.hash;
        var searchParams = ioQuery.queryToObject(search.slice(1));
        searchParams.viewer = itemId;
        this.dispatch(_actions_2.push("?" + ioQuery.objectToQuery(searchParams) + hash));
    };
    Gallery.prototype.showFullscreen = function (itemId) {
        var _a = this.props.router, search = _a.search, hash = _a.hash;
        var searchParams = ioQuery.queryToObject(search.slice(1));
        searchParams.viewer = itemId;
        searchParams.fullscreen = true;
        this.dispatch(_actions_2.push("?" + ioQuery.objectToQuery(searchParams) + hash));
    };
    return Gallery;
}(Component_1.default));
exports.default = Gallery;
function splitToPages(items, perPage) {
    return items.reduce(function (result, item) {
        if (result[result.length - 1].length < perPage) {
            result[result.length - 1].push(item);
        }
        else {
            result.push([item]);
        }
        return result;
    }, [[]]);
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var Caption_1 = __webpack_require__(21);
var _actions_1 = __webpack_require__(4);
var _reducers_1 = __webpack_require__(22);
exports.reducers = _reducers_1.reducers;
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            panelType: _this.props.getPanelType(_this.props.item.type)
        };
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        _this.handleMaxClick = _this.handleMaxClick.bind(_this);
        return _this;
    }
    Panel.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.i18n;
        var config = this.props.applicationBaseResult.config;
        var author = config.showAuthor ? (tsx("p", { class: "font-size--1 card-last hug-bottom author-text", key: this.props.item.title + "-author" }, this.props.item.owner)) : null;
        var tooltipSnippet;
        if (config.showSummaryTooltip) {
            tooltipSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (tooltipSnippet && tooltipSnippet.length > config.tooltipTruncLength) {
                tooltipSnippet = tooltipSnippet.slice(0, config.tooltipTruncLength) + "...";
            }
        }
        var cardSnippet;
        var summaryElement;
        if (config.showItemSummary) {
            cardSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (cardSnippet && cardSnippet.length > config.summaryTruncLength) {
                cardSnippet = cardSnippet.slice(0, config.summaryTruncLength) + "...";
            }
            summaryElement = tsx("p", { class: "item-description-text" }, cardSnippet);
        }
        var itemPageLink;
        if (config.showItemPageLink) {
            itemPageLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": tooltipSnippet ? tooltipSnippet : i18n.ui.itemExtTip, href: this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, style: "color: " + config.buttonBgColor, key: this.props.item.title + "-info-icon" },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "svg-icon" },
                    tsx("path", { d: "M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z" }))));
        }
        var maxLink;
        if (this.props.itemType !== "file" && !config.alwaysOpenFullscreen) {
            maxLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": i18n.ui[this.state.panelType + "ExtTip"], style: "color: " + config.buttonBgColor, key: this.props.item.title + "-open-out-icon", onclick: this.handleMaxClick },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "svg-icon" },
                    tsx("path", { d: "M2 4v24h28V4H2zm26 22H4V10h24v16z" }))));
        }
        var mainTip = this.props.itemType === "file" ? i18n.ui.itemExtTip :
            (config.alwaysOpenFullscreen ? i18n.ui[this.state.panelType + "ExtTip"] : i18n.ui.galleryTip);
        var title;
        if (config.showItemTitle) {
            title = (tsx("a", { title: mainTip, style: "color: " + config.linkColor, class: "break-word" },
                tsx("h5", { tabindex: "0", class: "clickable" }, this.props.item.title)));
        }
        return (tsx("div", { class: "card block trailer-1 animate-fade-in card-fade", style: "background-color: " + config.cardColor + "; z-index: " + 1000, key: this.props.item.id + "-div" },
            tsx("figure", { class: "card-image-wrap" },
                tsx("a", { title: mainTip, role: "link", tabindex: "0" },
                    tsx("img", { key: this.props.item.id + "-thumbnail", class: "card-image clickable thumbnail-min", src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", alt: this.props.item.title, onmouseover: this.handleMouseOver, onmouseout: this.handleMouseOut, onclick: this.handleItemClick, style: "\n                                background-image: url(" + this.props.item.thumbnailUrl + ");\n                                background-repeat: no-repeat;\n                                background-size: cover;\n                            " })),
                tsx(Caption_1.default, { key: "card-caption" })),
            tsx("div", { class: "card-content", style: "color: " + config.fontColor },
                title,
                summaryElement,
                author,
                tsx("div", { class: "open-out-container" },
                    itemPageLink,
                    maxLink))));
    };
    Panel.prototype.handleMouseOver = function () {
        this.dispatch(_actions_1.mouseOver());
    };
    Panel.prototype.handleMouseOut = function () {
        this.dispatch(_actions_1.mouseOut());
    };
    Panel.prototype.handleItemClick = function () {
        if (this.props.itemType === "file") {
            window.open(this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, "_blank");
        }
        else {
            if (this.props.applicationBaseResult.config.alwaysOpenFullscreen) {
                this.handleMaxClick();
            }
            else {
                this.dispatch(_actions_1.showInViewer());
            }
        }
    };
    Panel.prototype.handleMaxClick = function () {
        if (this.props.applicationBaseResult.config.openFullscreenSeparateTab) {
            if (this.props.itemType === "webapp") {
                window.open(this.props.item.url, "_blank");
            }
            else {
                window.open("" + window.location.origin + window.location.pathname + "?viewer=" + this.props.item.id + "&fullscreen=true", "_blank");
            }
        }
        else {
            if (this.props.itemType === "webapp") {
                window.location.href = this.props.item.url;
            }
            else {
                this.dispatch(_actions_1.showFullscreen());
            }
        }
    };
    return Panel;
}(Component_1.default));
exports.default = Panel;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var Caption = /** @class */ (function (_super) {
    __extends(Caption, _super);
    function Caption(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            captionBelowOpacity: 0.8,
            captionOpacity: 1,
            captionTransform: 0,
            panelType: _this.props.getPanelType(_this.props.item.type)
        };
        return _this;
    }
    Caption.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.applicationBaseResult.config;
        if (config.showItemType) {
            if (config.itemTypeBelowThumbnail) {
                return (tsx("div", { class: "card-below-image-caption", style: "\n                            opacity: " + this.state.captionBelowOpacity + ";\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
            else {
                return (tsx("div", { class: "card-image-caption", style: "\n                            opacity: " + this.state.captionOpacity + ";\n                            transform: translate(0, " + this.state.captionTransform + "%);\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
        }
        return null;
    };
    Caption.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.hovering !== this.props.hovering) {
            this.setState({
                captionBelowOpacity: nextProps.hovering ? 1 : 0.8,
                captionOpacity: nextProps.hovering ? 0 : 1,
                captionTransform: nextProps.hovering ? 100 : 0
            });
        }
    };
    return Caption;
}(Component_1.default));
exports.default = Caption;
function convertHex(hex, opacity) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    return result;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(4);
var applicationBaseResult = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var i18n = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var item = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var itemType = function (state) {
    if (state === void 0) { state = "file"; }
    return state;
};
var getPanelType = function (state) {
    if (state === void 0) { state = function (itemType) {
        var recognizedTypes = {
            "Web Mapping Application": "app",
            "Web Map": "map",
            "Web Scene": "scene"
        };
        if (recognizedTypes[itemType]) {
            return recognizedTypes[itemType];
        }
        return "file";
    }; }
    return state;
};
var hovering = function (state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case _actions_1.MOUSE_OVER:
            return true;
        case _actions_1.MOUSE_OUT:
            return false;
        default:
            return state;
    }
};
exports.reducers = Component_1.combineReducers({
    applicationBaseResult: applicationBaseResult,
    i18n: i18n,
    item: item,
    hovering: hovering,
    getPanelType: getPanelType,
    itemType: itemType
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var View_1 = __webpack_require__(24);
var convertHex_1 = __webpack_require__(31);
var supportedItemTypes_1 = __webpack_require__(3);
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            containerClasses: {
                "animate-fade-in": true,
                "animate-fade-out": false
            }
        };
        _this.handleExitClick = _this.handleExitClick.bind(_this);
        _this.closeViewer = _this.closeViewer.bind(_this);
        return _this;
    }
    Viewer.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var config = this.props.base.applicationBaseResult.config;
        var item = this.props.items.viewerItem;
        if (this.props.viewer.visible && !!item.id) {
            var viewType = supportedItemTypes_1.default[item.type];
            var view = void 0;
            if (viewType === "webmap") {
                view = tsx(View_1.MapView, { key: item.id });
            }
            else if (viewType === "webscene") {
                view = tsx(View_1.SceneView, { key: item.id });
            }
            else if (viewType === "webapp") {
                view = tsx(View_1.AppView, { key: item.id });
            }
            else {
                return null;
            }
            if (this.props.viewer.fullscreen) {
                return (tsx("div", { id: "map-container", class: "map-container fullscreen", key: "map-container-fullscreen-" + item.id }, view));
            }
            return (tsx("div", { id: "view-container", key: "view-container", classes: this.state.containerClasses, style: "background-color: " + convertHex_1.default(config.bgColor, 85) },
                tsx("div", { id: "map-container", class: "map-container", key: "map-container-" + item.id },
                    view,
                    tsx("button", { class: "btn btn-clear view-exit-button clickable", onclick: this.handleExitClick, title: i18n.ui.close },
                        tsx("span", { class: "icon-ui-close view-exit-icon" })))));
        }
        return null;
    };
    Viewer.prototype.componentWillReceiveProps = function (nextProps) {
        if (!nextProps.viewer.visible) {
            this.childComponents = {};
        }
    };
    Viewer.prototype.handleExitClick = function () {
        var _this = this;
        this.setState({
            containerClasses: {
                "animate-fade-in": false,
                "animate-fade-out": true
            }
        });
        setTimeout(function () {
            _this.closeViewer();
            _this.setState({
                containerClasses: {
                    "animate-fade-in": true,
                    "animate-fade-out": false
                }
            });
        }, 750);
    };
    Viewer.prototype.closeViewer = function () {
        var _a = this.props.router, search = _a.search, hash = _a.hash;
        var searchParams = ioQuery.queryToObject(search.slice(1));
        delete searchParams.viewer;
        this.dispatch(_actions_1.push("?" + ioQuery.objectToQuery(searchParams) + hash));
    };
    return Viewer;
}(Component_1.default));
exports.default = Viewer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MapView_1 = __webpack_require__(25);
exports.MapView = MapView_1.MapView;
var AppView_1 = __webpack_require__(29);
exports.AppView = AppView_1.AppView;
var SceneView_1 = __webpack_require__(30);
exports.SceneView = SceneView_1.SceneView;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var ViewBase_1 = __webpack_require__(6);
var MapView = /** @class */ (function (_super) {
    __extends(MapView, _super);
    function MapView(store) {
        return _super.call(this, store) || this;
    }
    MapView.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        return (tsx(ViewBase_1.default, { key: "map-view", store: {
                reducers: ViewBase_1.reducers,
                initialState: {
                    config: config,
                    i18n: this.props.base.i18n,
                    id: this.props.items.viewerItem.id,
                    widgets: Object.keys(config)
                        .filter(function (key) { return key.indexOf("Widget") !== -1; })
                        .reduce(function (result, key) {
                        return __assign({}, result, (_a = {}, _a[key] = config[key], _a));
                        var _a;
                    }, {}),
                    viewModule: "esri/views/MapView",
                    webModule: "esri/WebMap",
                    containerId: "map-container"
                }
            } }));
    };
    return MapView;
}(Component_1.default));
exports.MapView = MapView;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    config: {},
    i18n: {},
    id: "",
    widgets: {},
    viewModule: "",
    webModule: "",
    containerId: "map-container"
};
exports.reducers = function (state, action) {
    if (state === void 0) { state = initialState; }
    return state;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var AppView = /** @class */ (function (_super) {
    __extends(AppView, _super);
    function AppView(store) {
        return _super.call(this, store) || this;
    }
    AppView.prototype.render = function () {
        var tsx = this.tsx;
        return (tsx("iframe", { src: this.props.items.viewerItem.url, class: "app-frame", id: "embedded-mapping-application-iframe", name: "nested-iframe" },
            tsx("h3", { class: "center-style" }, this.props.base.i18n.viewLoading.iframe)));
    };
    return AppView;
}(Component_1.default));
exports.AppView = AppView;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var ViewBase_1 = __webpack_require__(6);
var SceneView = /** @class */ (function (_super) {
    __extends(SceneView, _super);
    function SceneView(store) {
        return _super.call(this, store) || this;
    }
    SceneView.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        return (tsx(ViewBase_1.default, { key: "map-view", store: {
                reducers: ViewBase_1.reducers,
                initialState: {
                    config: config,
                    i18n: this.props.base.i18n,
                    id: this.props.items.viewerItem.id,
                    widgets: Object.keys(config)
                        .filter(function (key) { return key.indexOf("Widget") !== -1; })
                        .reduce(function (result, key) {
                        return __assign({}, result, (_a = {}, _a[key] = config[key], _a));
                        var _a;
                    }, {}),
                    viewModule: "esri/views/SceneView",
                    webModule: "esri/WebScene",
                    containerId: "map-container"
                }
            } }));
    };
    return SceneView;
}(Component_1.default));
exports.SceneView = SceneView;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (hex, opacity) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    return result;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager(store) {
        var _this = _super.call(this, store) || this;
        _this.handleNext = _this.handleNext.bind(_this);
        _this.handlePrevious = _this.handlePrevious.bind(_this);
        _this.handlePageButton = _this.handlePageButton.bind(_this);
        _this.handlePage = _this.handlePage.bind(_this);
        return _this;
    }
    Pager.prototype.render = function () {
        var _this = this;
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var displayItems = this.props.items.filteredItems;
        var pages = Math.ceil(displayItems.length / config.itemsPerPage);
        var prevButtonClasses = {
            "btn": true,
            "btn-disabled": this.props.page <= 1,
            "btn-transparent": true
        };
        var nextButtonClasses = {
            "btn": true,
            "btn-arrow": true,
            "btn-disabled": this.props.page >= pages,
            "btn-transparent": true
        };
        var pageButtons = Array.apply(null, Array(pages)).map(function (v, i) {
            var isActive = _this.props.page === i + 1;
            return (tsx("a", { id: "page-" + (i + 1) + "-button", title: "page-" + (i + 1), class: "btn" + (!isActive ? " btn-transparent" : ""), onclick: _this.handlePageButton, role: "link", tabindex: "0", style: "\n                        color: " + (isActive ? config.buttonTextColor : config.buttonBgColor) + ";\n                        background-color: " + (isActive ? config.buttonBgColor : null) + ";\n                        border: " + (isActive ? "1px solid " + config.buttonBgColor : "none") + "\n                    ", key: "page-button-" + (i + 1) + "-" + _this.props.items.displayKey }, i + 1));
        });
        return (tsx("div", { class: "text-center trailer-1 leader-1", key: "pager" },
            tsx("a", { id: "previous", title: "previous", classes: prevButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "previous-button", onclick: this.handlePrevious }, "Previous"),
            pageButtons,
            tsx("a", { id: "next", title: "next", classes: nextButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "next-button", onclick: this.handleNext }, "Next")));
    };
    Pager.prototype.handleNext = function () {
        this.handlePage(this.props.page + 1);
    };
    Pager.prototype.handlePrevious = function () {
        this.handlePage(this.props.page - 1);
    };
    Pager.prototype.handlePageButton = function (e) {
        this.handlePage(e.target.text);
    };
    Pager.prototype.handlePage = function (page) {
        if (page > 1) {
            this.dispatch(_actions_1.push(this.props.router.search + "#" + page));
        }
        else {
            this.dispatch(_actions_1.push("" + this.props.router.search));
        }
    };
    return Pager;
}(Component_1.default));
exports.default = Pager;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var base_1 = __webpack_require__(34);
var items_1 = __webpack_require__(35);
var router_1 = __webpack_require__(36);
var filter_1 = __webpack_require__(37);
var page_1 = __webpack_require__(38);
var viewer_1 = __webpack_require__(39);
exports.reducers = Component_1.combineReducers({
    base: base_1.default,
    items: items_1.default,
    router: router_1.default,
    filter: filter_1.default,
    page: page_1.default,
    viewer: viewer_1.default
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
exports.default = function (state, action) {
    switch (action.type) {
        case _actions_1.SAVE_APP_BASE_RESULT:
            return __assign({}, state, { loadMessage: "groupItems", applicationBaseResult: action.payload });
        case _actions_1.LOAD_APP_FAIL:
            return __assign({}, state, { status: "failed" });
        case _actions_1.LOAD_APP_PROGRESS:
            return __assign({}, state, { loadMessage: action.payload });
        case _actions_1.LOAD_APP_SUCCESS:
            return __assign({}, state, { status: "success" });
        default:
            return state;
    }
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
var initialState = {
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.UPDATE_ITEMS:
            return __assign({}, state, { allItems: action.payload });
        case _actions_1.LOCATION_CHANGE:
            var _a = action.payload, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var searchParams_1 = ioQuery.queryToObject(search.slice(1));
            if (searchParams_1.viewer) {
                var viewerItem = state.allItems.filter(function (item) { return item.id === searchParams_1.viewer; })[0];
                return __assign({}, state, { viewerItem: viewerItem ? viewerItem : {}, filteredItems: filterItems(state.allItems, searchParams_1.q ? searchParams_1.q : ""), displayKey: Math.random().toString(36).substring(7) });
            }
            return __assign({}, state, { filteredItems: filterItems(state.allItems, searchParams_1.q ? searchParams_1.q : ""), displayKey: Math.random().toString(36).substring(7) });
        default:
            return state;
    }
};
function filterItems(items, filter) {
    return items.filter(function (item) { return (item.title.toLowerCase().indexOf(filter) !== -1 ||
        item.type.toLowerCase().indexOf(filter) !== -1 ||
        item.owner.toLowerCase().indexOf(filter) !== -1 ||
        (item.tags && item.tags.map(function (tag) { return tag.toLowerCase(); }).indexOf(filter) !== -1) ||
        (item.description && item.description.indexOf(filter) !== -1)); });
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
var initialState = {
    pathname: "/",
    search: "",
    hash: ""
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.LOCATION_CHANGE:
            return __assign({}, state, action.payload);
        default:
            return state;
    }
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
exports.default = function (state, action) {
    if (state === void 0) { state = ""; }
    switch (action.type) {
        case _actions_1.LOCATION_CHANGE:
            var _a = action.payload, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var searchParams = ioQuery.queryToObject(search.slice(1));
            return (searchParams.q ? searchParams.q : "");
        default:
            return state;
    }
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
exports.default = function (state, action) {
    if (state === void 0) { state = 1; }
    switch (action.type) {
        case _actions_1.LOCATION_CHANGE:
            var hash = action.payload.hash;
            if (hash.length > 0) {
                return parseInt(hash.slice(1));
            }
            return 1;
        default:
            return state;
    }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
var initialState = {
    visible: false,
    fullscreen: false
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.LOCATION_CHANGE:
            var searchParams = ioQuery.queryToObject(action.payload.search.slice(1));
            if (searchParams.viewer) {
                return __assign({}, state, { visible: true, fullscreen: !!searchParams.fullscreen });
            }
            return __assign({}, state, { visible: false, fullscreen: false });
        default:
            return state;
    }
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
exports.router = function () { return function (next) { return function (action) {
    switch (action.type) {
        case _actions_1.PUSH:
            window.history.pushState(action.payload, "", action.payload);
            break;
        default:
            return next(action);
    }
}; }; };
function startHistoryListener(store) {
    store.dispatch(_actions_1.locationChange({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
    }));
    window.history["onpushstate"] = function (event) {
        var url = new URL("" + window.location.origin + window.location.pathname + event.state);
        store.dispatch(_actions_1.locationChange({
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        }));
    };
    window.onpopstate = function (event) {
        var url = new URL("" + window.location.origin + window.location.pathname + event.state);
        store.dispatch(_actions_1.locationChange({
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        }));
    };
}
exports.startHistoryListener = startHistoryListener;
(function (history) {
    var pushState = window.history.pushState;
    window.history.pushState = function (state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }
        return pushState.apply(history, arguments);
    };
})(window.history);


/***/ })
/******/ ])});;
//# sourceMappingURL=application.js.map