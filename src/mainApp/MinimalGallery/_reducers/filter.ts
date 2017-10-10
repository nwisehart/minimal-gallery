import * as ioQuery from "dojo/io-query";
import { LOCATION_CHANGE } from "../_actions";

export type FilterState = string;

export default (state: FilterState = "", action: __Component.Action): FilterState => {
    switch (action.type) {
        case LOCATION_CHANGE:
            const { pathname, search, hash } = action.payload;
            const searchParams = ioQuery.queryToObject(search.slice(1));
            return (searchParams.q ? searchParams.q : "");
        default:
            return state;
    }
};
