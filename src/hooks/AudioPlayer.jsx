import { useState, useEffect } from 'react';

function useAudioPlayer(url) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audioInstance = new Audio(url);

    setAudio(audioInstance);

    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
    };
  }, [url]);

  const play = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    play,
    pause,
    togglePlay,
    stop,
  };
}

export default useAudioPlayer;
