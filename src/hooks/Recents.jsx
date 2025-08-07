import { useEffect, useState } from "react";

export default function useRecents(limit) {
    const [ recents, _setRecents ] = useState();
    async function setRecents() {
        const recents = await getRecents(limit);
        _setRecents(recents);
    }

    useEffect(() => {
        setRecents();
    }, [])

    return [ recents ];
}

async function getRecents(limit) {
    const url = new URL('https://api.kexp.org/v2/plays/');
    url.search = new URLSearchParams({fomat: 'json', limit: limit || 20}).toString();

    const response = await fetch(url);
    const json = await response.json();
    return json.results;
}