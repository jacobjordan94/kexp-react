import { useEffect, useState } from "react";
import fetch from "@/lib/fetchJsonP";

function useJsonPFetch(url, params, options = { autoRefresh: false, interval: 0 }) {
    const [ response, setResponse ] = useState();

    async function refresh() {
        const _response = await fetch(url, params)
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

export default useJsonPFetch;