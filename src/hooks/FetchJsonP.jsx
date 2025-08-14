import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";

function useJsonPFetch(url, params, options = { autoRefresh: false, interval: 0 }) {
    const [ response, setResponse ] = useState();

    async function refresh() {
        const _response = await localFetch(url, params)
        setResponse(_response);
    }

    useEffect(() => {
        refresh();
        if(options.autoRefresh) {
            setInterval(refresh, options.interval);
        }
    }, []);

    return [ response, refresh ];
}

async function localFetch(url, params) {
    const _url = new URL(url);
    _url.search = new URLSearchParams(params).toString();

    const response = await fetchJsonp(_url.toString());
    const json = await response.json();

    return json;
}

export default useJsonPFetch;