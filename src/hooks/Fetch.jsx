import { useEffect, useState } from "react";
import fetch from '@/lib/localFetch';

function useFetch(url, params, options = { autoRefresh: false, interval: 0, makeRequestOnStart: true }) {
    const [ response, setResponse ] = useState();

    async function refresh(updatedUrl = null, updatedParams = {}) {
        const _response = await fetch(updatedUrl || url, { ...params, ...updatedParams });
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

export default useFetch;