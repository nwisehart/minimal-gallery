define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var pageButtons = Array.apply(null, Array(Math.ceil(props.total / props.perPage))).map(function (v, i) {
            var isActive = props.pointer < ((i + 1) * props.perPage) && props.pointer >= (i * props.perPage);
            return {
                render: function () { return (widget_1.jsxFactory.createElement("a", { id: "page-" + (i + 1), title: "page-" + (i + 1), class: "btn " + (isActive ? null : "btn-transparent"), onclick: isActive ? null : handlePage, role: "link", tabindex: "0", style: "\n                        color: " + (isActive ? props.config.buttonTextColor : props.config.buttonBgColor) + ";\n                        background-color: " + (isActive ? props.config.buttonBgColor : null) + ";\n                        border: " + (isActive ? "1px solid " + props.config.buttonBgColor : "none") + ";\n                    " }, i + 1)); }
            };
            function handlePage() {
                props.pointHandler(i * props.perPage);
            }
        });
        return {
            render: function () {
                if (pageButtons.length === 0) {
                    return (widget_1.jsxFactory.createElement("h3", { class: "center-style" }, props.i18n.pager.noResults));
                }
                else if (pageButtons.length === 1) {
                    return null;
                }
                return (widget_1.jsxFactory.createElement("div", { class: "text-center trailer-1 leader-1", key: "pager" },
                    widget_1.jsxFactory.createElement("a", { id: "previous", title: "previous", class: "btn btn-transparent " + (props.pointer <= 0 ? "btn-disabled" : null), onclick: handlePrevious, role: "link", tabindex: "0", style: "color:" + props.config.buttonBgColor + ";" }, "Previous"),
                    pageButtons.map(function (item) { return item.render(); }),
                    widget_1.jsxFactory.createElement("a", { id: "next", title: "next", class: "btn btn-transparent btn-arrow " + (props.total - props.pointer <= props.perPage ? "btn-disabled" : null), onclick: handleNext, role: "link", tabindex: "0", style: "color:" + props.config.buttonBgColor + ";" }, "Next")));
            }
        };
        function handlePrevious() {
            props.pointHandler(props.pointer - props.perPage);
        }
        function handleNext() {
            props.pointHandler(props.pointer + props.perPage);
        }
    };
});
//# sourceMappingURL=Pager.js.map