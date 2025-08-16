import { useEffect, useState } from "react";

function useFetch(url, params, options = { autoRefresh: false, interval: 0, makeRequestOnStart: true }) {
    const [ response, setResponse ] = useState();

    async function refresh(updatedUrl = null, updatedParams = {}) {
        const _response = await localFetch(updatedUrl || url, { ...params, ...updatedParams });
        setResponse(_response);
    }

    useEffect(() => {
        if(options.makeRequestOnStart) refresh();
        if(options.autoRefresh) {
            setInterval(refresh, options.interval);
        }
    }, []);

    return [ response, refresh ];
}

async function localFetch(url, params) {
    const _url = new URL(url);
    _url.search = new URLSearchParams(params).toString();

    const response = await fetch(_url);
    const json = await response.json();

    return json;
}

export default useFetch;