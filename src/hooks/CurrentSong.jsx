import { useEffect, useState } from "react";

export default function useCurrentSong() {
    const [ currentSong, _setCurrentSong ] = useState();

    async function setCurrentSong() {
        const song = await getCurrentSong();
        _setCurrentSong(song);
    }

    useEffect(() => {
        setCurrentSong();
        setInterval(setCurrentSong, 1000 * 20);
    }, [])

    return [ currentSong ];
}

async function getCurrentSong() {
    const url = new URL('https://api.kexp.org/v2/plays/');
    url.search = new URLSearchParams({
        fomat: 'json', limit: '1', ordering: '-airdate', playlsit_location: '3', airdate_before: new Date().toISOString(),
    }).toString();

    const response = await fetch(url);
    const json = await response.json();
    return json.results[0];
}