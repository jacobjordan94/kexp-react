 import { create } from 'zustand';
 import fetch from "@/lib/localFetch";
import useRecentsStore from './useRecentsStore';
import useCurrentBackgroundStore from './useCurrentBackgroundStore';
import useCurrentShowStore from './useCurrentShowStore';

const fetchParams = {
    format: 'json', limit: '1', // ordering: '-airdate', playlist_location: '3',
};

const useCurrentSongStore = create((set, get) => ({
    currentSong: null,
    intervalId: null,
    setCurrentSong: currentSong => set({ currentSong }),
    setIntervalId: intervalId => set({ intervalId }),
    fetchCurrentSong: async () => {
        const json = await fetch('https://api.kexp.org/v2/plays/', fetchParams);
        if (json?.results?.length > 0) {
            get().performUpdate(json.results[0]);
        }
    },
    startAutoRefresh: (interval = 60000) => {
        if(get().intervalId) clearInterval(get().intervalId);
        const intervalId = setInterval(() => get().fetchCurrentSong(), interval);
        get().setIntervalId(intervalId);
    },
    stopAutoRefresh: () => {
        if(get().intervalId) clearInterval(get().intervalId);
        get().setIntervalId(null);
    },
    updateCurrentSongComment: comment => {
        get().setCurrentSong({ ...get().currentSong, comment });
    },
    startup: (currentSong, interval = 60000) => {
        get().setCurrentSong(currentSong);
        get().startAutoRefresh(interval);
    },
    performUpdate: fetched => {
        const currentSong = get().currentSong;
        const setCurrentSong = get().setCurrentSong;
        const updateCurrentSongComment = get().updateCurrentSongComment;
        const addRecent = useRecentsStore.getState().addRecent;
        const currentShow = useCurrentShowStore.getState().currentShow;
        const fetchCurrentShow = useCurrentShowStore.getState().fetchCurrentShow();

        if (!fetched) return;

        const isAirbreak = fetched?.play_type == 'airbreak';
        if(isAirbreak) {
            fetched = fixAirbreakObject(fetched);
        }
        const sameSong = currentSong?.id === fetched?.id;
        const needsComment = !Boolean(currentSong?.comment);
        const fetchedHasComment = Boolean(fetched.comment);
        const updateComment = sameSong && needsComment && fetchedHasComment;
        const newShow = currentShow.id !== fetched.show;

        if(!sameSong) {
            if(isAirbreak) {
                setCurrentSong(fetched);
                setBackground(fetched);
            } else {
                setCurrentSong(fetched);
                addRecent(fetched);
                setBackground(fetched);
            }
        }
        if(updateComment) {
            updateCurrentSongComment(fetched.comment);
        }
        if(newShow) {
            fetchCurrentShow();
        }
    },
}));


function setBackground(song) {
    const currentBackground = useCurrentBackgroundStore.getState().currentBackground;
    const setCurrentBackground = useCurrentBackgroundStore.getState().setCurrentBackground;

    if (!song) return;

    const newBackground = song.image_uri || song.thumbnail_uri;
    if (newBackground !== currentBackground) {
        setCurrentBackground(newBackground);
    }
}

function fixAirbreakObject(airbreak) {
    return  {
        ...airbreak,
        song: 'Airbreak',
        track_id: null,
        recording_id: null,
        artist: 'KEXP 90.3 FM',
        artist_ids: [null],
        album: 'KEXP 90.3 FM',
        release_id: null,
        release_group_id: null,
        labels: [],
        label_ids: [],
        release_date: null,
        rotation_status: null,
        is_local: false,
        is_request: false,
        is_live: false,
        // todo - In object but replacing anyways
        image_uri: "",
        thumbnail_uri: "",
        comment: "",
    };
}

export default useCurrentSongStore;