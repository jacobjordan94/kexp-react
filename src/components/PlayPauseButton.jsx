import { useState } from "react"
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

function PlayPauseButton({ className = '' }) {

    const [ isPlaying, setIsPlaying ] = useState(false);
    function togglePlayPause() {
        setIsPlaying(!isPlaying);
    }

    return <button className={'reset-padding play-pause-button ' + className} onClick={togglePlayPause}>
        { isPlaying ? <PauseIcon /> : <PlayIcon /> }
    </button>
}

export default PlayPauseButton;
