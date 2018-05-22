import * as ioQuery from "dojo/io-query";
import { UPDATE_ITEMS, FILTER_ITEMS, HASH_CHANGE, SAVE_APP_BASE_RESULT } from "../_actions";

export interface ItemsState {
    allowedItemTypes: { [type: string]: boolean };
    allItems: __Component.Pojo[];
    filteredItems: __Component.Pojo[];
    displayKey: string;
    viewerItem: __Component.Pojo;
} 

const initialState: ItemsState = {
    allowedItemTypes: {},
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};

export default (state: ItemsState = initialState, action: { type: string, payload: any }): ItemsState => {
    switch (action.type) {
        case SAVE_APP_BASE_RESULT:
            return {
                ...state,
                allowedItemTypes: action.payload.config.itemTypes.reduce((r: ItemsState["allowedItemTypes"], c: string) => {
                    r[c] = true;
                    return r;
                }, {})
            };
        case UPDATE_ITEMS:
            return {
                ...state,
                allItems: action.payload
            };
        case HASH_CHANGE:
            const hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.viewer) {
                const viewerItem = state.allItems.filter((item) => item.id === hashParams.viewer)[0];
                return {
                    ...state,
                    viewerItem: viewerItem ? viewerItem : {},
                    filteredItems: filterItems(
                        state.allItems,
                        hashParams.query ? hashParams.query : "",
                        state.allowedItemTypes
                    ),
                    displayKey: Math.random().toString(36).substring(7)
                };
            }
            return {
                ...state,
                filteredItems: filterItems(
                    state.allItems,
                    hashParams.query ? hashParams.query : "",
                    state.allowedItemTypes
                ),
                displayKey: Math.random().toString(36).substring(7)
            };
        default:
            return state;
    }
};

function filterItems(items: __Component.Pojo[], filter: string, allowedItemTypes: ItemsState["allowedItemTypes"]) {
    return items.filter((item: __Component.Pojo) => (
        allowedItemTypes[item.type] && (
            item.title.toLowerCase().indexOf(filter) !== -1 ||
            item.type.toLowerCase().indexOf(filter) !== -1 ||
            item.owner.toLowerCase().indexOf(filter) !== -1 ||
            (item.tags && item.tags.map((tag: string) => tag.toLowerCase()).indexOf(filter) !== -1) ||
            (item.description && item.description.indexOf(filter) !== -1) ||
            (item.snippet && item.snippet.indexOf(filter) !== -1)
        )
    ));
}
