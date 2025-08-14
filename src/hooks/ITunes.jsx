import { useEffect, useState } from "react";
import useFetch from "./Fetch";

function useITunes(artist, song) {
    const [state, setState] = useState();
    const [ artistResponse ] = useFetch('https://itunes.apple.com/search', {
        term: artist,
        media: 'music',
        entity: 'musicArtist',
        limit: 1,
    });
    const [ songResponse ] = useFetch('https://itunes.apple.com/search', {
        term: `${artist}+${song}`,
        media: 'music',
        entity: 'song',
        limit: 1,
    })
    
    useEffect(() => {
        if(artistResponse && songResponse) {
            setState({ artistResponse, songResponse });
        }
    }, [ artistResponse, songResponse ])

    return [ state ];
}

export default useITunes;