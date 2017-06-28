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
define(["require", "exports", "esri/Camera", "esri/core/promiseUtils", "esri/core/requireUtils", "esri/geometry/Extent", "esri/geometry/Point"], function (require, exports, Camera, promiseUtils, requireUtils, Extent, Point) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    function getComponents(components) {
        if (!components) {
            return;
        }
        return components.split(",");
    }
    exports.getComponents = getComponents;
    function getCamera(viewpointString) {
        // ?viewpoint=cam:-122.69174973,45.53565982,358.434;117.195,59.777
        var viewpointArray = viewpointString && viewpointString.split(";");
        if (!viewpointArray || !viewpointArray.length) {
            return;
        }
        var cameraIndex = viewpointArray[0].indexOf("cam:") !== -1 ? 0 : 1;
        var tiltAndHeadingIndex = cameraIndex === 0 ? 1 : 0;
        var cameraString = viewpointArray[cameraIndex];
        var tiltAndHeadingString = viewpointArray[tiltAndHeadingIndex];
        var cameraProperties = _getCameraProperties(cameraString, tiltAndHeadingString);
        if (cameraProperties.position) {
            return new Camera(cameraProperties);
        }
        return;
    }
    exports.getCamera = getCamera;
    function getPoint(center) {
        // ?center=-13044705.25,4036227.41,102113&level=12
        // ?center=-13044705.25;4036227.41;102113&level=12
        // ?center=-117.1825,34.0552&level=12
        // ?center=-117.1825;34.0552&level=12
        if (!center) {
            return null;
        }
        var centerArray = _splitURLString(center);
        var centerLength = centerArray.length;
        if (centerLength < 2) {
            return null;
        }
        var x = parseFloat(centerArray[0]);
        var y = parseFloat(centerArray[1]);
        if (isNaN(x) || isNaN(y)) {
            return null;
        }
        var wkid = centerLength === 3 ? parseInt(centerArray[2], 10) : 4326;
        return new Point({
            x: x,
            y: y,
            spatialReference: {
                wkid: wkid
            }
        });
    }
    exports.getPoint = getPoint;
    function getZoom(level) {
        return level && parseInt(level, 10);
    }
    exports.getZoom = getZoom;
    function getExtent(extent) {
        // ?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100
        // ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
        // ?extent=-117.2672,33.9927,-117.0746,34.1064
        // ?extent=-117.2672;33.9927;-117.0746;34.1064
        if (!extent) {
            return null;
        }
        var extentArray = _splitURLString(extent);
        var extentLength = extentArray.length;
        if (extentLength < 4) {
            return null;
        }
        var xmin = parseFloat(extentArray[0]), ymin = parseFloat(extentArray[1]), xmax = parseFloat(extentArray[2]), ymax = parseFloat(extentArray[3]);
        if (isNaN(xmin) || isNaN(ymin) || isNaN(xmax) || isNaN(ymax)) {
            return null;
        }
        var wkid = extentLength === 5 ? parseInt(extentArray[4], 10) : 4326;
        var ext = new Extent({
            xmin: xmin,
            ymin: ymin,
            xmax: xmax,
            ymax: ymax,
            spatialReference: {
                wkid: wkid
            }
        });
        return ext;
    }
    exports.getExtent = getExtent;
    function getGraphic(marker) {
        // ?marker=-117;34;4326;My Title;http://www.daisysacres.com/images/daisy_icon.gif;My location&level=10
        // ?marker=-117,34,4326,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-13044705.25,4036227.41,102100,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-117,34,,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-117,34,,,,My location&level=10
        // ?marker=-117,34&level=10
        // ?marker=10406557.402,6590748.134,2526
        if (!marker) {
            return promiseUtils.resolve();
        }
        var markerArray = _splitURLString(marker);
        var markerLength = markerArray.length;
        if (markerLength < 2) {
            return promiseUtils.reject();
        }
        return requireUtils.when(require, [
            "esri/Graphic",
            "esri/PopupTemplate",
            "esri/symbols/PictureMarkerSymbol"
        ]).then(function (modules) {
            var Graphic = modules[0], PopupTemplate = modules[1], PictureMarkerSymbol = modules[2];
            var x = parseFloat(markerArray[0]);
            var y = parseFloat(markerArray[1]);
            var content = markerArray[3];
            var icon_url = markerArray[4];
            var label = markerArray[5];
            var wkid = markerArray[2] ? parseInt(markerArray[2], 10) : 4326;
            var symbolSize = "32px"; // todo: fix typings in next JS API release.
            var defaultMarkerSymbol = {
                url: require.toUrl("./symbols/marker.png"),
                width: "32px",
                height: "32px",
            };
            var symbolOptions = icon_url ? {
                url: icon_url,
                height: symbolSize,
                width: symbolSize
            } : defaultMarkerSymbol;
            var markerSymbol = new PictureMarkerSymbol(symbolOptions);
            var point = new Point({
                "x": x,
                "y": y,
                "spatialReference": {
                    "wkid": wkid
                }
            });
            var hasPopupDetails = content || label;
            var popupTemplate = hasPopupDetails ?
                new PopupTemplate({
                    "title": content || null,
                    "content": label || null
                }) : null;
            var graphic = new Graphic({
                geometry: point,
                symbol: markerSymbol,
                popupTemplate: popupTemplate
            });
            return graphic;
        });
    }
    exports.getGraphic = getGraphic;
    function getBasemap(basemapUrl, basemapReferenceUrl) {
        // ?basemapUrl=https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer&basemapReferenceUrl=http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer
        if (!basemapUrl) {
            return promiseUtils.resolve();
        }
        return requireUtils.when(require, ["esri/layers/Layer", "esri/Basemap"]).then(function (modules) {
            var Layer = modules[0], Basemap = modules[1];
            var getBaseLayer = Layer.fromArcGISServerUrl({
                url: basemapUrl
            });
            var getReferenceLayer = basemapReferenceUrl ? Layer.fromArcGISServerUrl({
                url: basemapReferenceUrl
            }) : promiseUtils.resolve();
            var getBaseLayers = promiseUtils.eachAlways({
                baseLayer: getBaseLayer,
                referenceLayer: getReferenceLayer
            });
            return getBaseLayers.then(function (response) {
                var baseLayer = response.baseLayer;
                var referenceLayer = response.referenceLayer;
                var basemapOptions = {
                    baseLayers: [baseLayer.value],
                    referenceLayers: referenceLayer.value ? [referenceLayer.value] : []
                };
                return new Basemap(basemapOptions).load();
                ;
            });
        });
    }
    exports.getBasemap = getBasemap;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    function _splitURLString(value) {
        if (!value) {
            return null;
        }
        var splitValues = value.split(";");
        return splitValues.length === 1 ? value.split(",") : splitValues;
    }
    function _getCameraPosition(cameraString) {
        if (!cameraString) {
            return null;
        }
        var cameraValues = cameraString.substr(4, cameraString.length - 4);
        var positionArray = cameraValues.split(",");
        if (positionArray.length < 3) {
            return null;
        }
        var x = parseFloat(positionArray[0]), y = parseFloat(positionArray[1]), z = parseFloat(positionArray[2]);
        var wkid = positionArray.length === 4 ? parseInt(positionArray[3], 10) : 4326;
        return new Point({
            x: x,
            y: y,
            z: z,
            spatialReference: {
                wkid: wkid
            }
        });
    }
    function _getTiltAndHeading(tiltAndHeading) {
        if (tiltAndHeading == "") {
            return null;
        }
        var tiltHeadingArray = tiltAndHeading.split(",");
        return tiltHeadingArray.length >= 0 ? {
            heading: parseFloat(tiltHeadingArray[0]),
            tilt: parseFloat(tiltHeadingArray[1])
        } : null;
    }
    function _getCameraProperties(cameraString, tiltAndHeading) {
        var cameraPosition = _getCameraPosition(cameraString);
        var tiltAndHeadingProperties = _getTiltAndHeading(tiltAndHeading);
        return __assign({ position: cameraPosition }, tiltAndHeadingProperties);
    }
});
//# sourceMappingURL=urlUtils.js.map