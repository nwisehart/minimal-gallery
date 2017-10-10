import { PUSH, locationChange } from "../_actions";

export const router = () => (next: any) => (action: any) => {
    switch (action.type) {
        case PUSH:
            history.pushState(action.payload, "", action.payload);
            break;
        default:
            return next(action);
    }
};

export function startHistoryListener(store: __Component.Store) {
    store.dispatch(locationChange({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
    }));

    history["onpushstate"] = (event: any) => {
        const url = new URL(`${window.location.origin}${window.location.pathname}${event.state}`);
        store.dispatch(locationChange({
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        }));
    };

    window.onpopstate = (event: any) => {
        const url = new URL(`${window.location.origin}${window.location.pathname}${event.state}`);
        store.dispatch(locationChange({
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
        }));
    };
}

(function(history: any){
    var pushState = history.pushState;
    history.pushState = function(state: any) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({ state });
        }
        return pushState.apply(history, arguments);
    };
})(window.history);
