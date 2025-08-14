import { useEffect, useState } from "react";
import useFetch from "./Fetch";

function useWikiImage(artistName) {
    const formattedName = artistName.replace(/\s+/g, '_');
    const [ response ] = useFetch('https://en.wikipedia.org/w/api.php', {
        action: 'query',
        format: 'json',
        titles: formattedName,
        prop: 'pageImages',
        piprop: 'original',
    });
    const [ state, _setState ] = useState();

    function setState() {
        const pages = response.query.pages;
        const pageId = Object.keys(pages)[0];
        if(pages[pageId].hasOwnProperty('original')) {
            const imageUrl = pages[pageId].original.source;
            _setState(imageUrl);
        } else {
            _setState(null)
        }
    }

    useEffect(() => {
        if(!response) return;
        setState();
    }, [response]);

    return [ state ];
}

export default useWikiImage;