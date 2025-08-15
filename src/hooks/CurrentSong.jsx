import { useEffect, useState } from "react";
import useFetch from "./Fetch";

export default function useCurrentSong(interval = (30 * 1000)) {
    const params = {
        fomat: 'json', limit: '1', ordering: '-airdate', playlsit_location: '3',
    };
    const url = 'https://api.kexp.org/v2/plays/';
    const [ response ] = useFetch(url, params, { autoRefresh: true, interval: interval });
    const [ currentSong, setCurrentSong ] = useState();

    useEffect(() => {
        if(!response) return;
        if(!currentSong || response.results[0].id !== currentSong.id) setCurrentSong(response.results[0]);
        if(currentSong && currentSong.id === response.results[0].id && !currentSong.comment && response.results[0].comment) setCurrentSong(response.results[0]);
    }, [response]);

    return [ currentSong ];
}