import { useEffect, useState } from "react";
import useCurrentShow from "./CurrentShow";
import useCurrentSong from "./CurrentSong";
import useRecents from "./Recents";
import useLikedSongs from "./LikedSongs";

function useGlobals() {
    const [ globalState, _setGlobalState ] = useState({
        currentSong: null,
    });

    const [ currentShow, refreshCurrentShow ] = useCurrentShow();
    const [ currentSong ] = useCurrentSong();
    const [ recents, setRecents ] = useRecents();
    const [ likedSongs, likedSongsDispatch ] = useLikedSongs();
    const [ currentBackground, setCurrentBackground ] = useState();

    function setGlobalState(partialState) {
        _setGlobalState(oldState => ({ ...oldState, ...partialState }));
    }

    useEffect(() => {
        if(!currentSong && !globalState && !recents) return;
        if(currentSong && globalState.currentSong && currentSong.show !== globalState.currentSong.show) refreshCurrentShow();
        if(currentSong && recents && currentSong.play_type === 'trackplay') setRecents(old => [ {...currentSong}, ...old]);
        setGlobalState({ currentSong });
        if(currentSong && !globalState.background) {
            setCurrentBackground(currentSong.image_uri || currentSong.thumbnail_uri);
        }
    }, [ currentSong ]);

    useEffect(() => {
        if(!currentShow) return;
        setGlobalState({ currentShow });
    }, [ currentShow ]);

    useEffect(() => {
        if(!recents) return;
        setGlobalState({ recents });
    }, [ recents ]);

    useEffect(() => {
        if(!likedSongs) return;
        setGlobalState({ likedSongs: { songs: likedSongs, dispatch: likedSongsDispatch }});
    }, [ likedSongs ]);

    useEffect(() => {
        if(currentBackground || currentBackground === '') {
            setGlobalState({ background: { image: currentBackground, setCurrentBackground } })
        }
    }, [ currentBackground ]);

    return [ globalState, setGlobalState ];
}

export default useGlobals;