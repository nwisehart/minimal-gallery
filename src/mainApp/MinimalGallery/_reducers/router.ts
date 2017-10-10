import { LOCATION_CHANGE } from "../_actions";

export interface RouterState {
    pathname: string;
    search: string;
    hash: string;
}

const initialState = {
    pathname: "/",
    search: "",
    hash: ""
};

export default (state: RouterState = initialState, action: __Component.Action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
