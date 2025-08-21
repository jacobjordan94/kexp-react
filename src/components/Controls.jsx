import { HeartIcon, PlayIcon, PauseIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
// import PlayPauseButton from "./PlayPauseButton";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../main";
import { useNavigate } from "react-router";

const HomeButton = ({ className, onClick, children, disabled = false, shadow = false }) => 
    <div className="home-button-wrap">
        <div className={"rounded-full overflow-hidden backdrop-blur-2xl inline-flex transparent-border-dark border-2 " + (shadow ? 'default-shadow shadow-xl border-none' : '')}>
            <button disabled={disabled} className={'home-button reset-padding disabled:opacity-75 disabled:blur-2 ' + className} 
                    onClick={onClick}
            >
                <div className="p-2">
                    { children }
                </div>
            </button>
        </div>
    </div>

function InformationButton({ currentSong, shadow = false })  {
    const navigate = useNavigate();

    return ( currentSong &&
        <HomeButton 
            disabled={ currentSong.play_type !== 'trackplay' }
            className={'information size-12'} 
            onClick={() => navigate('/song/' + currentSong.id)}
            shadow={shadow}
        >
            <InformationCircleIcon /> :
        </HomeButton>
    );
}

function PlayPauseButton({ onClick, shadow = false }) {
    const [ audioIsPlaying, setAudioIsPlaying ] = useState(false);
    return (
        <HomeButton className={'play-pause size-16'} onClick={() => setAudioIsPlaying(!audioIsPlaying)} shadow="false">
        {
            audioIsPlaying ? <PauseIcon /> : <PlayIcon />
        }
        </HomeButton>
    );
}

function LikeButton({ currentSong, shadow = false }) {
    const { globalState: { likedSongs: { songs, dispatch } } } = useContext(GlobalContext);
    const [ liked, setLiked ] = useState(false); 
    const alreadyLiked = () => songs.findIndex(song => song.id === currentSong.id) > -1;
    
    function toggleLike() {
        if(alreadyLiked()) {
            dispatch({ type: 'remove', id: currentSong.id })
        } else {
            dispatch({ type: 'add', song: {...currentSong} });
        }
    }

    useEffect(() => {
        if(!songs && !currentSong) return;
        if(alreadyLiked()) {
            setLiked(true);
        } else { setLiked(false); }
    }, [ songs, currentSong ]);

    return ( currentSong && songs &&
        <HomeButton 
            className={'like size-12'} 
            onClick={toggleLike}
            disabled={ currentSong.play_type !== 'trackplay' }
            shadow={shadow}
        >
        {
            liked ?
            <HeartIcon /> : <HeartOutlineIcon />
        }
        </HomeButton>
    );
}

export function Controls({ currentSong, className = '', offset = true, shadow = false }) {
    return (
        <div className={"controls-wrapper " + className}>
            <InformationButton shadow={shadow} currentSong={currentSong} />
            <div className={offset ? 'mt-4' : ''}>
                <PlayPauseButton shadow={shadow} />
            </div>
            <LikeButton shadow={shadow} currentSong={currentSong} />
        </div>
    );
}