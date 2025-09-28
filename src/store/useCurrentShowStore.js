import { create } from "zustand";
import fetch from "@/lib/localFetch";

const useCurrentShowStore = create((set, get) => ({
  currentShow: null,
  fetchCurrentShow: async () => {
    const json = await fetch('https://api.kexp.org/v2/shows/?limit=1');
    if (json?.results?.length > 0) {
      set({ currentShow: json.results[0] });
      return json.results[0];
    }
    else throw new Error('Unable to get current show');
  },
  startAutoRefresh: (interval = 60000) => {
    if(get().intervalId) clearInterval(get().intervalId);
    const intervalId = setInterval(() => get().fetchCurrentShow(), interval);
    set({ intervalId });
  },
  stopAutoRefresh: () => {
    if(get().intervalId) clearInterval(get().intervalId);
    set({ intervalId: null });
  },
  intervalId: null,
  startup: async () => {
    return get().fetchCurrentShow();
  }
}));

export default useCurrentShowStore;
