import { create } from 'zustand';
import fetch from '@/lib/localFetch';

const recentsParams = {fomat: 'json', exclude_airbreaks: true};
const useRecentsStore = create((set, get) => ({
  recents: [],
  setRecents: (list) => set({ recents: list }),
  addRecent: (song) => {
    if(!song || song?.play_type !== 'trackplay') return;
    const exists = get().recents.indexOf(recentSong => recentSong.id === song.id) > -1;
    if(!exists) {
      set({ recents: [song, ...get().recents] })
    }
  },
  startup: async (limit = 20) => {
    const params = {...recentsParams, limit};
    const response = await fetch('https://api.kexp.org/v2/plays/', params);
    const results = response?.results;
    if(results?.length > 0) {
      get().setRecents(results);
      return results[0];
    } else {
      throw new Error("Startup execution failed");
    }
  },
}));
export default useRecentsStore;