import { useEffect, useState } from "react"
import useFetch from "./Fetch";

export function useShow() {
    const [ state, setState ] = useState();
    const url = 'https://api.kexp.org/v2/shows/';
    const params = { limit: 1 };
    const [ response, makeRequest ] = useFetch('', params, { makeRequestOnStart: false });
    
    function getShow(id) {
        makeRequest(url + id);
    }

    useEffect(() => {
        if(!response) return;
        setState(response);
    }, [ response ]);

    return [ state, getShow ];
}