import * as ioQuery from "dojo/io-query";
import { LOCATION_CHANGE } from "../_actions";

export interface ViewerState {
    visible: boolean;
    fullscreen: boolean; 
}

const initialState: ViewerState = {
    visible: false,
    fullscreen: false
};

export default (state: ViewerState = initialState, action: __Component.Action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            const searchParams = ioQuery.queryToObject(action.payload.search.slice(1));
            if (searchParams.viewer) {
                return {
                    ...state,
                    visible: true,
                    fullscreen: !!searchParams.fullscreen
                };
            }
            return {
                ...state,
                visible: false,
                fullscreen: false
            };
        default:
            return state;
    }
};
