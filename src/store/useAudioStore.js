import { create } from 'zustand';

const useAudioStore = create((set, get) => {
  let audio = null;

  return {
    isPlaying: false,
    init: (url) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      audio = new Audio(url);
      audio.addEventListener('ended', () => {
        set({ isPlaying: false });
      });
      return Promise.resolve();
    },
    play: () => {
      if (audio) {
        audio.play();
        set({ isPlaying: true });
      }
    },
    pause: () => {
      if (audio) {
        audio.pause();
        set({ isPlaying: false });
      }
    },
    togglePlay: () => {
      const { isPlaying } = get();
      if (isPlaying) {
        get().pause();
      } else {
        get().play();
      }
    },
    stop: () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        set({ isPlaying: false });
      }
    },
  };
});

export default useAudioStore;
