import { useEffect, useState } from "react";
import useFetch from "./Fetch";

export function useHost() {
    const [ state, setState ] = useState();
    const url = 'https://api.kexp.org/v2/hosts/';
    const params = { limit: 1 };
    const [ response, makeRequest ] = useFetch('', params, { makeRequestOnStart: false });

    function getHost(id) {
        makeRequest(url + id);
    }

    useEffect(() => {
        if(!response) return;
        setState(response);
    }, [ response ]);

    return [ state, getHost ];
}