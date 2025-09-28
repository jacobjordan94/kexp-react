import { create } from "zustand";

const useCurrentBackgroundStore = create((set, get) => ({
    currentBackground: null,
    setCurrentBackground: currentBackground => set({ currentBackground }),
    updateBackgroundIfNeeded: (pathname, image_uri, thumbnail_uri) => {
        // const usesDefaultBG = defaultBackgroundPages.some(dbp => dbp.includes(pathname) && pathname !== '/');
        // if (pathname === '/' || usesDefaultBG) {
        //     const bg = image_uri || thumbnail_uri;
        //     set({ currentBackground: bg });
        // }
        const bg = image_uri || thumbnail_uri;
        get().setCurrentBackground(bg);
    }
}));

export default useCurrentBackgroundStore;