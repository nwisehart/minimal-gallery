import * as ioQuery from "dojo/io-query";
import { LOCATION_CHANGE } from "../_actions";

export type PageState = number;

export default (state: PageState = 1, action: __Component.Action): PageState => {
    switch (action.type) {
        case LOCATION_CHANGE:
            const { hash } = action.payload;
            if (hash.length > 0) {
                return parseInt(hash.slice(1));
            }
            return 1;
        default:
            return state;
    }
};
