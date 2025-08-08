import { useEffect, useState } from "react";
import useCurrentShow from "./CurrentShow";
import useCurrentSong from "./CurrentSong";
import useRecents from "./Recents";

function useGlobals() {
    const [ globalState, _setGlobalState ] = useState({
        currentSong: null,
    });

    const [ currentShow, refreshCurrentShow ] = useCurrentShow();
    const [ currentSong ] = useCurrentSong();
    const [ recents, setRecents ] = useRecents();

    function setGlobalState(partialState) {
        _setGlobalState(oldState => ({ ...oldState, ...partialState }));
    }

    useEffect(() => {
        if(!currentSong && !globalState && !recents) return;
        if(currentSong && globalState.currentSong && currentSong.show !== globalState.currentSong.show) refreshCurrentShow();
        if(currentSong && recents && currentSong.play_type === 'trackplay') setRecents(old => [ {...currentSong}, ...old]);
        setGlobalState({ currentSong });
    }, [ currentSong ]);

    useEffect(() => {
        if(!currentShow) return;
        setGlobalState({ currentShow });
    }, [ currentShow ]);

    useEffect(() => {
        if(!recents) return;
        setGlobalState({ recents });
    }, [ recents ]);

    return [ globalState, setGlobalState ];
}

export default useGlobals;