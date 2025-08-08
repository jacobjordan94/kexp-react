import { useEffect, useState } from "react";
import useCurrentSong from "./CurrentSong";
import useRecents from "./Recents";

function useStartup() {
    const [ startup, setStartup ] = useState();
    const [ currentSong ] = useCurrentSong();
    const [ recents ] = useRecents();

    const hasStartedUp = false;
    // function startup() {

    //     hasStartedUp = true;
    // }

    useEffect((test) => {
        // if(!currentSong && !recents) return;
        // if(currentSong && recents && !hasStartedUp) startup();
        // else {
        //     // 
        // }
    }, [ currentSong, recents ])

    return [ startup ];
}

export default useStartup;