import { useEffect, useState } from "react";
import useFetch from "./Fetch";

function useRecents(limit = 30) {

    const params = {fomat: 'json', limit: limit, exclude_airbreaks: true};
    const url = 'https://api.kexp.org/v2/plays/';
    const [ response ] = useFetch(url, params);
    const [ recents, setRecents ] = useState();

    useEffect(() => {
        if(!response) return;
        setRecents(response.results);
    }, [ response ]);

    return [ recents ];
}

export default useRecents;