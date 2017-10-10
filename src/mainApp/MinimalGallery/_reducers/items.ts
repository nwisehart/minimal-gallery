import * as ioQuery from "dojo/io-query";
import { UPDATE_ITEMS, FILTER_ITEMS, LOCATION_CHANGE } from "../_actions";

export interface ItemsState {
    allItems: __Component.Pojo[];
    filteredItems: __Component.Pojo[];
    displayKey: string;
    viewerItem: __Component.Pojo;
} 

const initialState: ItemsState = {
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};

export default (state: ItemsState = initialState, action: { type: string, payload: any }): ItemsState => {
    switch (action.type) {
        case UPDATE_ITEMS:
            return {
                ...state,
                allItems: action.payload
            };
        case LOCATION_CHANGE:
            const { pathname, search, hash } = action.payload;
            const searchParams = ioQuery.queryToObject(search.slice(1));
            if (searchParams.viewer) {
                const viewerItem = state.allItems.filter((item) => item.id === searchParams.viewer)[0];
                return {
                    ...state,
                    viewerItem: viewerItem ? viewerItem : {},
                    filteredItems: filterItems(state.allItems, searchParams.q ? searchParams.q : ""),
                    displayKey: Math.random().toString(36).substring(7)
                };
            }
            return {
                ...state,
                filteredItems: filterItems(state.allItems, searchParams.q ? searchParams.q : ""),
                displayKey: Math.random().toString(36).substring(7)
            };
        default:
            return state;
    }
};

function filterItems(items: __Component.Pojo[], filter: string) {
    return items.filter((item: __Component.Pojo) => (
        item.title.toLowerCase().indexOf(filter) !== -1 ||
        item.type.toLowerCase().indexOf(filter) !== -1 ||
        item.owner.toLowerCase().indexOf(filter) !== -1 ||
        (item.tags && item.tags.map((tag: string) => tag.toLowerCase()).indexOf(filter) !== -1) ||
        (item.description && item.description.indexOf(filter) !== -1)
    ));
}
