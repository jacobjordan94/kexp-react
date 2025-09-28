import useAudioStore from "@/store/useAudioStore";
import useCurrentShowStore from "@/store/useCurrentShowStore";
import useCurrentSongStore from "@/store/useCurrentSongStore";
import useRecentsStore from "@/store/useRecentsStore";
import { useEffect, useState } from "react";

export default function useStartup() {
    
    const [ ready, setReady ] = useState(false);
    const [ error, setError ] = useState(false);

    const recentsStartup     = useRecentsStore(store => store.startup);
    const currentSongStartup = useCurrentSongStore(store => store.startup);
    const currentShowStartup = useCurrentShowStore(store => store.startup);
    const audioStartup       = useAudioStore(store => store.init);

    async function startup() {
        return recentsStartup()
            .then((_currentSong) => Promise.all([
                currentSongStartup(_currentSong),
                currentShowStartup(),
                audioStartup(),
            ]));
    }

    useEffect(() => {
        startup()
            .then(() => setReady(true))
            .catch(() => setError(true));
    }, []);

    return [ ready, error ];
}