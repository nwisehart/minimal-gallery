export const PUSH = "ROUTER/PUSH";
export const LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";

import { MinimalGalleryState } from "..";

export const push = (href: string) => ({
    type: PUSH,
    payload: href,
});

export const locationChange = (location: { pathname: string; search: string; hash: string }) => ({
    type: LOCATION_CHANGE,
    payload: {
        ...location
    }
});
