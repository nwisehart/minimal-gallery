import { jsxFactory } from "esri/widgets/support/widget";

interface IPanelProps {
    i18n: any;
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
}

export default (props: IPanelProps) => {
    const author = props.config.showAuthor ? (
        <p class="font-size--1 card-last hug-bottom">
            {props.item.owner}
        </p>
    ) : null;

    const PanelBaseComponent = {
        captionOpacity: 1,
        captionTransform: 0,

        render() {
            return (
                <div class="card block trailer-1 animate-fade-in card-fade" style={`background-color: ${props.config.cardColor};`}>
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
                        <div
                            class="card-image-caption"
                            key="cardCaption"
                            style={`
                                opacity: ${PanelBaseComponent.captionOpacity};
                                transform: translate(0, ${PanelBaseComponent.captionTransform}%);
                                background-color: ${convertHex(props.captionColor, 80)};
                                color: ${props.config.captionTextColor}
                            `}
                        >
                            {props.item.displayName}
                        </div>
                    </figure>
                    <div class="card-content" style={`color: ${props.config.fontColor}`}>
                        <a title={props.i18n.ui.galleryTip} style={`color: ${props.config.linkColor}`}>
                            <h5 tabindex="0" class="clickable" onclick={props.itemClickHandler}>
                                {props.item.title}
                            </h5>
                        </a>
                        {author}
                        <div class="open-out-container">
                            <a
                                class="open-out-icon btn btn-transparent icon-ui-description"
                                title={props.extItem} href={props.extLink}
                                style={`color: ${props.config.buttonBgColor}`}
                            />
                            <a
                                class="open-out-icon btn btn-transparent icon-ui-maximize"
                                title={props.extTitle} href={props.maxLink}
                                style={`color: ${props.config.buttonBgColor}`}
                            />
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
