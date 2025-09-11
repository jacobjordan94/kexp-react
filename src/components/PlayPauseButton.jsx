import { useContext } from "react"
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { GlobalContext } from '../main';

function PlayPauseButton({ className = '' }) {
    const { globalState } = useContext(GlobalContext);
    const { audio: { isPlaying, togglePlay } } = globalState;

    return (
        <button className={'reset-padding play-pause-button ' + className} 
                onClick={togglePlay}
        >
            { isPlaying ? <PauseIcon /> : <PlayIcon /> }
        </button>
    ); 
}

export default PlayPauseButton;
