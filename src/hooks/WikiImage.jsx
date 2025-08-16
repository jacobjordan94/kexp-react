import { useEffect, useState } from "react";
import useJsonPFetch from "./FetchJsonP";
import fetchJsonp from "fetch-jsonp";

function useWikiImage() {
    const [ state, setState ] = useState();

    function search(artistName) {
        if(artistName === '') {
            setState([]);
            return;
        }
        const formattedName = artistName.replace(/\s/g, '_');
        makeRequest(formattedName)
            .then(images => setState(images));
    }
    
    function makeRequest(artistName) {
        const url = new URL('https://en.wikipedia.org/w/api.php');
        url.search = new URLSearchParams({
            action: 'query',
            format: 'json',
            titles: artistName,
            prop: 'images',
        }).toString();
        return fetchJsonp(url.toString())
            .then(response => response.json())
            .then(json => formatResponse(json))
            .catch(() => []);

    }

    function formatResponse(json) {
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if(pages[pageId].hasOwnProperty('images')) {
            const images = pages[pageId].images.filter(
                image => { 
                    return image.title.toLowerCase().indexOf('.jpg') > -1 
                }
            ).map(image => image.title);
            return images;
        }
        return [];
    }


    return [state, search];
}

export default useWikiImage;