import { useEffect, useState } from "react";
import useFetch from "./Fetch";

function useCurrentShow() {
    const [ state, _setState ] = useState();
    const [ response, refresh ] = useFetch('https://api.kexp.org/v2/shows/', { limit: 1 });

    function setState() {
        if(!response) return;
        const show = response.results[0];
        _setState(show);
    }

    useEffect(setState, [ response ]);

    return [ state, refresh ];
}

export default useCurrentShow;