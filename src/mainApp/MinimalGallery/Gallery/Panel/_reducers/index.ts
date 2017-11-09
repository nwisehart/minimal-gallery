import { combineReducers } from "../../../../../Component";
import { SHOW_IN_VIEWER, MOUSE_OVER, MOUSE_OUT } from "../_actions";

export interface PanelState {
    applicationBaseResult: __esriApplicationBase.ApplicationConfig;
    i18n: __Component.Pojo;
    item: __Component.Pojo;
    hovering: boolean;
    getPanelType: (itemType: string) => string;
    itemType: string;
}

const applicationBaseResult = (state: __esriApplicationBase.ApplicationConfig = {}) => state;
const i18n = (state: __Component.Pojo = {}) => state;
const item = (state: __Component.Pojo = {}) => state;
const itemType = (state: string = "file") => state;

const getPanelType = (
    state: (itemType: string) => string = (type: string) => {
        const recognizedTypes = {
            "Web Mapping Application": "app",
            "Web Map": "map",
            "Web Scene": "scene",
            "Dashboard": "app"
        };
        if (recognizedTypes[type]) { return recognizedTypes[type]; }
        return "file";
    }
) => state;

const hovering = (state: boolean = false, action: { type: string, payload: any }) => {
    switch (action.type) {
        case MOUSE_OVER:
            return true;
        case MOUSE_OUT:
            return false;
        default:
            return state;
    }
};

export const reducers = combineReducers({
    applicationBaseResult,
    i18n,
    item,
    hovering,
    getPanelType,
    itemType
});
