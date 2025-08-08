import { useEffect, useState } from "react";
import useCurrentSong from "./CurrentSong";
import useRecents from "./Recents";

function useStartup() {
    const [ startup, _setStartup ] = useState();
    let currentSong;
    const [ recents, setRecents ] = useRecents();

    const hasStartedUp = false;
    useEffect(() => {
        if(!recents || hasStartedUp) return;
        currentSong = useCurrentSong()[0];
        hasStartedUp = true;
    }, [ recents ]);

    useEffect(() => {
        if(!currentSong) return;
        setRecents(prev => {
            if(!prev || prev[0].id == currentSong.id) return;
            if(currentSong.play_type === 'airbreak') return;
            setRecents([{...currentSong}, ...prev]);
            setStartup();
        });
    }, [ currentSong ])

    function setStartup() {
        _setStartup({ currentSong, recents });
    }

    return [ startup ];
}

export default useStartup;