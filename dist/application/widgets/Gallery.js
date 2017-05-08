var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "esri/widgets/support/widget", "./panels/PanelComposites"], function (require, exports, widget_1, PanelComposites_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var childProps = {
            config: props.config,
            i18n: props.i18n,
            itemClickHandler: props.itemClickHandler
        };
        var displayItems = props.items.map(function (item, index) {
            if (item.type === "Web Map") {
                return PanelComposites_1.MapPanel(__assign({}, childProps, { item: item }));
            }
            else if (item.type === "Web Mapping Application") {
                return PanelComposites_1.AppPanel(__assign({}, childProps, { item: item }));
            }
            return PanelComposites_1.ScenePanel(__assign({}, childProps, { item: item }));
        });
        return {
            render: function () {
                return (widget_1.jsxFactory.createElement("div", { class: "grid-container leader-1" },
                    widget_1.jsxFactory.createElement("div", { class: "column-24" },
                        widget_1.jsxFactory.createElement("div", { class: "block-group block-group-5-up tablet-block-group-2-up phone-block-group-1-up" }, displayItems.map(function (item) { return item.render(); })))));
            }
        };
    };
});
//# sourceMappingURL=Gallery.js.map