import { jsxFactory } from "esri/widgets/support/widget";
import { AppPanel, MapPanel, ScenePanel } from "./panels/PanelComposites";
import Pager from "./Pager";

interface IGalleryProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    itemClickHandler: any;
    items: any[];
}

export default (props: IGalleryProps) => {
    const childProps = {
        config: props.config,
        i18n: props.i18n,
        itemClickHandler: props.itemClickHandler
    };
    let displayItems = props.items.map((item, index) => {
        if (item.type === "Web Map") {
            return MapPanel({ ...childProps, item });
        } else if (item.type === "Web Mapping Application") {
            return AppPanel({ ...childProps, item });
        }
        return ScenePanel({ ...childProps, item });
    });
    return {
        render() {
            return (
                <div class="grid-container leader-1">
                    <div class="column-24">
                        <div class="block-group block-group-5-up tablet-block-group-2-up phone-block-group-1-up">
                            {displayItems.map((item) => item.render())}
                        </div>
                    </div>
                </div>
            );
        }
    };
};
