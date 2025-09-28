import { create } from 'zustand';

const fromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("kexp-likes"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const updateStorage = (songs) => {
  localStorage.setItem("kexp-likes", JSON.stringify(songs));
};

const useLikedSongsStore = create((set, get) => ({
  songs: fromLocalStorage(),
  addSong: (song) => {
    if (!song || song.play_type !== 'trackplay') return;
    const exists = get().songs.some(s => s.id === song.id);
    if (exists) return;
    const updated = [song, ...get().songs];
    updateStorage(updated);
    set({ songs: updated });
  },
  removeSong: (id) => {
    const updated = get().songs.filter(song => song.id !== id);
    updateStorage(updated);
    set({ songs: updated });
  },
  toggleSong: (song) => {
    const exists = get().songs.some(s => s.id === song.id);
    if (exists) {
      get().removeSong(song.id);
    } else {
      get().addSong(song);
    }
  }
}));

export default useLikedSongsStore;
