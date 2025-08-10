import { useEffect, useState } from "react";
import useFetch from "./Fetch";

function useSong(id) {
    const [ state, setState ] = useState();
    const [ response ] = useFetch('https://api.kexp.org/v2/plays/' + id + '/');

    useEffect(() => {
        if(!response) return;
        setState(response);
    }, [ response ]);

    return [ state ];
}

export default useSong;