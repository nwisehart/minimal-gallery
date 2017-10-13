import Component from "../../../../Component";
import Caption from "./Caption";

import { showInViewer, showFullscreen, mouseOver, mouseOut } from "./_actions";

import { PanelState } from "./_reducers";
export { PanelState, reducers } from "./_reducers";

interface ComponentState {
    panelType: string;
}

export default class Panel extends Component<PanelState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            panelType: this.props.getPanelType(this.props.item.type)
        }

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleMaxClick = this.handleMaxClick.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const i18n = this.props.i18n;
        const config = this.props.applicationBaseResult.config;

        const author = config.showAuthor ? (
            <p class="font-size--1 card-last hug-bottom author-text" key={`${this.props.item.title}-author`}>
                {this.props.item.owner}
            </p>
        ) : null;

        let tooltipSnippet;
        if (config.showSummaryTooltip) {
            tooltipSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (tooltipSnippet && tooltipSnippet.length > config.tooltipTruncLength) {
                tooltipSnippet = tooltipSnippet.slice(0, config.tooltipTruncLength) + "...";
            }
        }

        let cardSnippet;
        let summaryElement;
        if (config.showItemSummary) {
            cardSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (cardSnippet && cardSnippet.length > config.summaryTruncLength) {
                cardSnippet = cardSnippet.slice(0, config.summaryTruncLength) + "...";
            }
            summaryElement = <p class="item-description-text">{cardSnippet}</p>;
        }

        let itemPageLink;
        if (config.showItemPageLink) {
            itemPageLink = (
                <a
                    class="open-out-icon btn btn-transparent toolbar-tooltip"
                    aria-label={tooltipSnippet ? tooltipSnippet : i18n.ui.itemExtTip}
                    href={`${this.props.applicationBaseResult.portal.url}/home/item.html?id=${this.props.item.id}`}
                    style={`color: ${config.buttonBgColor}`}
                    key={`${this.props.item.title}-info-icon`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        class="svg-icon"
                    >
                        <path
                            d="M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z"
                        />
                    </svg>
                </a>
            );
        }

        let maxLink;
        if (this.props.itemType !== "file" && !config.alwaysOpenFullscreen) {
            maxLink = (
                <a
                    class="open-out-icon btn btn-transparent toolbar-tooltip"
                    aria-label={i18n.ui[`${this.state.panelType}ExtTip`]}
                    style={`color: ${config.buttonBgColor}`}
                    key={`${this.props.item.title}-open-out-icon`}
                    onclick={this.handleMaxClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        class="svg-icon"
                    >
                        <path d="M2 4v24h28V4H2zm26 22H4V10h24v16z"/>
                    </svg>
                </a>
            );
        }

        const mainTip = this.props.itemType === "file" ? i18n.ui.itemExtTip :
            (config.alwaysOpenFullscreen ? i18n.ui[`${this.state.panelType}ExtTip`] : i18n.ui.galleryTip);

        let title;
        if (config.showItemTitle) {
            title = (
                <a title={mainTip} style={`color: ${config.linkColor}`} class="break-word">
                    <h5 tabindex="0" class="clickable">
                        {this.props.item.title}
                    </h5>
                </a>
            );
        }

        return (
            <div
                class="card block trailer-1 animate-fade-in card-fade"
                style={`background-color: ${config.cardColor}; z-index: ${1000}`}
                key={`${this.props.item.id}-div`}
            >
                <figure class="card-image-wrap">
                    <a title={mainTip} role="link" tabindex="0">
                        <img
                            key={`${this.props.item.id}-thumbnail`}
                            class="card-image clickable thumbnail-min"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            alt={this.props.item.title}
                            onmouseover={this.handleMouseOver}
                            onmouseout={this.handleMouseOut}
                            onclick={this.handleItemClick}
                            style={`
                                background-image: url(${this.props.item.thumbnailUrl});
                                background-repeat: no-repeat;
                                background-size: cover;
                            `}
                        />
                    </a>
                    <Caption key="card-caption" />
                </figure>
                <div class="card-content" style={`color: ${config.fontColor}`}>
                    {title}
                    {summaryElement}
                    {author}
                    <div class="open-out-container">
                        {itemPageLink}
                        {maxLink}
                    </div>
                </div>
            </div>
        );
    }

    private handleMouseOver() {
        this.dispatch(mouseOver());
    }

    private handleMouseOut() {
        this.dispatch(mouseOut());
    }

    private handleItemClick() {
        if (this.props.itemType === "file") {
            window.open(
                `${this.props.applicationBaseResult.portal.url}/home/item.html?id=${this.props.item.id}`,
                "_blank"
            );
        } else {
            if (this.props.applicationBaseResult.config.alwaysOpenFullscreen) {
                this.handleMaxClick();
            } else {
                this.dispatch(showInViewer());
            }
        }
    }

    private handleMaxClick() {

        if (this.props.applicationBaseResult.config.openFullscreenSeparateTab) {
            if (this.props.itemType === "webapp") {
                window.open(this.props.item.url, "_blank");
            } else {
                window.open(
                    `${window.location.origin}${window.location.pathname}?viewer=${this.props.item.id}&fullscreen=true`,
                    "_blank"
                );
            }
        } else {
            if (this.props.itemType === "webapp") {
                window.location.href = this.props.item.url;
            } else {
                this.dispatch(showFullscreen());
            }
        }
    }
}
