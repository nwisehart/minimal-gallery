import { tsx } from "esri/widgets/support/widget";

interface IPanelProps {
    i18n: any;
    index: number;
    item: any;
    captionColor: string;
    config: {
        [propName: string]: any;
    };
    itemClickHandler: () => void;
    maxLink: string;
    extTitle: string;
    extLink: string;
    extItem: string;
    portalUrl: string;
}

export default (props: IPanelProps) => {
    const author = props.config.showAuthor ? (
        <p class="font-size--1 card-last hug-bottom author-text" key={`${props.item.title}-author`}>
            {props.item.owner}
        </p>
    ) : null;

    let tooltipSnippet;
    if (props.config.showSummaryTooltip) {
        tooltipSnippet = props.item.snippet ? props.item.snippet : null;
        if (tooltipSnippet.length > props.config.tooltipTruncLength) {
            tooltipSnippet = tooltipSnippet.slice(0, props.config.tooltipTruncLength) + "...";
        }
    }

    let cardSnippet;
    let summaryElement;
    if (props.config.showItemSummary) {
        cardSnippet = props.item.snippet ? props.item.snippet : null;
        if (cardSnippet.length > props.config.summaryTruncLength) {
            cardSnippet = cardSnippet.slice(0, props.config.summaryTruncLength) + "...";
        }
        summaryElement = <p class="item-description-text">{cardSnippet}</p>;
    }

    const PanelBaseComponent = {
        captionOpacity: 1,
        captionTransform: 0,

        render() {
            const caption = props.config.showItemType ? (
                <div
                    class="card-image-caption"
                    style={`
                        opacity: ${PanelBaseComponent.captionOpacity};
                        transform: translate(0, ${PanelBaseComponent.captionTransform}%);
                        background-color: ${convertHex(props.captionColor, 80)};
                        color: ${props.config.captionTextColor}
                    `}
                >
                    {props.item.displayName}
                </div>
            ) : null;

            return (
                <div
                    class="card block trailer-1 animate-fade-in card-fade"
                    style={`background-color: ${props.config.cardColor}; z-index: ${1000 - props.index}`}
                    key={`${props.item.title}-div`}
                >
                    <figure class="card-image-wrap">
                        <a title={props.i18n.ui.galleryTip} role="link" tabindex="0" onkeypress={handleKeyPress}>
                            <img class="card-image clickable thumbnail-min"
                                img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                alt={props.item.title}
                                onmouseover={handleMouseOver}
                                onmouseleave={handleMouseOut}
                                onclick={props.itemClickHandler}
                                style={`
                                    background-image: url(${props.item.thumbnailUrl});
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                `}
                            />
                        </a>
                        {caption}
                    </figure>
                    <div class="card-content" style={`color: ${props.config.fontColor}`}>
                        <a title={props.i18n.ui.galleryTip} style={`color: ${props.config.linkColor}`}>
                            <h5 tabindex="0" class="clickable" onclick={props.itemClickHandler}>
                                {props.item.title}
                            </h5>
                        </a>
                        {summaryElement}
                        {author}
                        <div class="open-out-container">
                            <a
                                class="open-out-icon btn btn-transparent toolbar-tooltip"
                                aria-label={tooltipSnippet ? tooltipSnippet : props.extItem}
                                title={props.extItem}
                                href={props.extLink}
                                style={`color: ${props.config.buttonBgColor}`}
                                key={`${props.item.title}-info-icon`}
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
                            <a
                                class="open-out-icon btn btn-transparent toolbar-tooltip"
                                aria-label={props.extTitle}
                                title={props.extTitle}
                                href={props.maxLink}
                                style={`color: ${props.config.buttonBgColor}`}
                                key={`${props.item.title}-open-out-icon`}
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
                        </div>
                    </div>
                </div>
            );
        }
    };

    function handleMouseOver() {
        PanelBaseComponent.captionOpacity = 0;
        PanelBaseComponent.captionTransform = 100;
    }

    function handleMouseOut() {
        PanelBaseComponent.captionOpacity = 1;
        PanelBaseComponent.captionTransform = 0;
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            props.itemClickHandler();
        }
    }

    function convertHex( hex: string, opacity: number ) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const result = `rgba(${r},${g},${b},${opacity / 100})`;
        return result;
    }

    return PanelBaseComponent;
};
