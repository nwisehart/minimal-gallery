define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var author = props.config.showAuthor ? (widget_1.tsx("p", { class: "font-size--1 card-last hug-bottom author-text", key: props.item.title + "-author" }, props.item.owner)) : null;
        var tooltipSnippet;
        if (props.config.showSummaryTooltip) {
            tooltipSnippet = props.item.snippet ? props.item.snippet : null;
            if (tooltipSnippet && tooltipSnippet.length > props.config.tooltipTruncLength) {
                tooltipSnippet = tooltipSnippet.slice(0, props.config.tooltipTruncLength) + "...";
            }
        }
        var cardSnippet;
        var summaryElement;
        if (props.config.showItemSummary) {
            cardSnippet = props.item.snippet ? props.item.snippet : null;
            if (cardSnippet && cardSnippet.length > props.config.summaryTruncLength) {
                cardSnippet = cardSnippet.slice(0, props.config.summaryTruncLength) + "...";
            }
            summaryElement = widget_1.tsx("p", { class: "item-description-text" }, cardSnippet);
        }
        var maxLink;
        if (props.maxLink) {
            maxLink = (widget_1.tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": props.extTitle, title: props.extTitle, href: props.maxLink, style: "color: " + props.config.buttonBgColor, key: props.item.title + "-open-out-icon" },
                widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "svg-icon" },
                    widget_1.tsx("path", { d: "M2 4v24h28V4H2zm26 22H4V10h24v16z" }))));
        }
        var mainTip = props.i18n.ui.galleryTip;
        if (!props.maxLink) {
            mainTip = props.i18n.ui.itemExtTip;
        }
        var PanelBaseComponent = {
            captionBelowOpacity: 0.8,
            captionOpacity: 1,
            captionTransform: 0,
            render: function () {
                var caption = null;
                if (props.config.showItemType) {
                    if (props.config.itemTypeBelowThumbnail) {
                        caption = (widget_1.tsx("div", { class: "card-below-image-caption", style: "\n                                opacity: " + PanelBaseComponent.captionBelowOpacity + ";\n                                background-color: " + convertHex(props.captionColor, 80) + ";\n                                color: " + props.config.captionTextColor + "\n                            " }, props.item.displayName));
                    }
                    else {
                        caption = (widget_1.tsx("div", { class: "card-image-caption", style: "\n                                opacity: " + PanelBaseComponent.captionOpacity + ";\n                                transform: translate(0, " + PanelBaseComponent.captionTransform + "%);\n                                background-color: " + convertHex(props.captionColor, 80) + ";\n                                color: " + props.config.captionTextColor + "\n                            " }, props.item.displayName));
                    }
                }
                return (widget_1.tsx("div", { class: "card block trailer-1 animate-fade-in card-fade", style: "background-color: " + props.config.cardColor + "; z-index: " + 1000, key: props.item.title + "-div" },
                    widget_1.tsx("figure", { class: "card-image-wrap" },
                        widget_1.tsx("a", { title: mainTip, role: "link", tabindex: "0", onkeypress: handleKeyPress },
                            widget_1.tsx("img", { class: "card-image clickable thumbnail-min", img: true, src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", alt: props.item.title, onmouseover: handleMouseOver, onmouseleave: handleMouseOut, onclick: props.itemClickHandler, style: "\n                                    background-image: url(" + props.item.thumbnailUrl + ");\n                                    background-repeat: no-repeat;\n                                    background-size: cover;\n                                " })),
                        caption),
                    widget_1.tsx("div", { class: "card-content", style: "color: " + props.config.fontColor },
                        widget_1.tsx("a", { title: mainTip, style: "color: " + props.config.linkColor, class: "break-word" },
                            widget_1.tsx("h5", { tabindex: "0", class: "clickable", onclick: props.itemClickHandler }, props.item.title)),
                        summaryElement,
                        author,
                        widget_1.tsx("div", { class: "open-out-container" },
                            widget_1.tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": tooltipSnippet ? tooltipSnippet : props.extItem, title: props.extItem, href: props.extLink, style: "color: " + props.config.buttonBgColor, key: props.item.title + "-info-icon" },
                                widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "svg-icon" },
                                    widget_1.tsx("path", { d: "M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z" }))),
                            maxLink))));
            }
        };
        function handleMouseOver() {
            PanelBaseComponent.captionBelowOpacity = 1;
            PanelBaseComponent.captionOpacity = 0;
            PanelBaseComponent.captionTransform = 100;
        }
        function handleMouseOut() {
            PanelBaseComponent.captionBelowOpacity = 0.8;
            PanelBaseComponent.captionOpacity = 1;
            PanelBaseComponent.captionTransform = 0;
        }
        function handleKeyPress(e) {
            if (e.keyCode === 13) {
                props.itemClickHandler();
            }
        }
        function convertHex(hex, opacity) {
            hex = hex.replace("#", "");
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
            return result;
        }
        return PanelBaseComponent;
    };
});
//# sourceMappingURL=PanelBase.js.map