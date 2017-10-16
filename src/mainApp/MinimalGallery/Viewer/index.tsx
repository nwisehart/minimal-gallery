import * as ioQuery from "dojo/io-query";
import Component from "../../../Component";
import { push } from "../_actions";

import { MinimalGalleryState } from "..";
import { AppView, MapView, SceneView } from "./View";
import convertHex from "../_utilities/convertHex";
import supportedItemTypes from "../_utilities/supportedItemTypes";

interface ComponentState {
    containerClasses: {
        "animate-fade-in": boolean;
        "animate-fade-out": boolean;
    };
}

export default class Viewer extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            containerClasses: {
                "animate-fade-in": true,
                "animate-fade-out": false
            }
        };

        this.handleExitClick = this.handleExitClick.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const i18n = this.props.base.i18n;
        const config = this.props.base.applicationBaseResult.config;
        const item = this.props.items.viewerItem;

        if (this.props.viewer.visible && !!item.id) {
            const viewType = supportedItemTypes[item.type];
            let view;
            if (viewType === "webmap") {
                view = <MapView key={item.id} />;
            } else if (viewType === "webscene") {
                view = <SceneView key={item.id} />;
            } else if (viewType === "webapp") {
                view = <AppView key={item.id} />;
            } else {
                return null;
            }

            if (this.props.viewer.fullscreen) {
                return (
                    <div id="map-container" class="map-container fullscreen" key={`map-container-fullscreen-${item.id}`}>
                        {view}
                    </div>
                );
            }
            return (
                <div
                    id="view-container"
                    key="view-container"
                    classes={this.state.containerClasses}
                    style={`background-color: ${convertHex(config.bgColor, 85)}`}
                >
                    <div id="map-container" class="map-container" key={`map-container-${item.id}`}>
                        {view}
                        <button
                            class="btn btn-clear view-exit-button clickable"
                            onclick={this.handleExitClick}
                            title={i18n.ui.close}
                        >
                            <span class="icon-ui-close view-exit-icon" />
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }

    public componentWillReceiveProps(nextProps: MinimalGalleryState) {
        if (!nextProps.viewer.visible) {
            this.childComponents = {};
        }
    }

    private handleExitClick() {
        this.setState({
            containerClasses: {
                "animate-fade-in": false,
                "animate-fade-out": true
            }
        });
        setTimeout(() => {
            this.closeViewer();
            this.setState({
                containerClasses: {
                    "animate-fade-in": true,
                    "animate-fade-out": false
                }
            });
        }, 750);
    }

    private closeViewer() {
        const { hash } = this.props.router;
        const hashParams = ioQuery.queryToObject(hash);
        delete hashParams.viewer;
        this.dispatch(push(ioQuery.objectToQuery(hashParams)));
    }
}