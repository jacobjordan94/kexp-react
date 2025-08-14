import { useEffect, useState } from "react";
import useJsonPFetch from "./FetchJsonP";

function useWikiImage(artistName) {
    const [ state, _setState ] = useState();
    if(!artistName) {
        _setState([]);
        return [ state ];
    };
    const formattedName = artistName.replace(/\s+/g, '_');
    const [ response ] = useJsonPFetch('https://en.wikipedia.org/w/api.php', {
        action: 'query',
        format: 'json',
        titles: formattedName,
        prop: 'images',
    });

    function setState() {
        const pages = response.query.pages;
        const pageId = Object.keys(pages)[0];
        if(pages[pageId].hasOwnProperty('images')) {
            const images = pages[pageId].images.filter(
                image => { 
                    return image.title.toLowerCase().indexOf('.jpg') > -1 
                }
            ).map(image => image.title);
            _setState(images);
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