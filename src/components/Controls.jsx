import { HeartIcon, InformationCircleIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../main";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";

const MediaButton = props => 
    <Button variant="glass" size="icon" {...props} 
        className={cn(
            "text-white text-lg", 
            "*:min-w-full *:min-h-full *:p-[20%]",
            "group-data-[shadows=true]/mediaControls:shadow-sm",
            "group-data-[shadows=true]/mediaControls:shadow-black/30",
            "group-data-[borders=true]/mediaControls:border-2",
            "group-data-[borders=true]/mediaControls:border-white/10",
            props.className, 
            )} >
        { props.children }
    </Button>


function InformationButton(props)  {
    const { globalState: { currentSong } } = useContext(GlobalContext);
    const navigate = useNavigate();
    return ( currentSong &&
        <MediaButton 
            disabled={ currentSong.play_type !== 'trackplay' }
            className={cn("information-button", props.className)} 
            onClick={() => navigate('/song/' + currentSong.id)}
            { ...props }
        >
            <InformationCircleIcon />
        </MediaButton>
    );
}

function PlayPauseButton(props) {
    const { globalState } = useContext(GlobalContext);
    const { audio: { isPlaying, togglePlay } } = globalState;
    return (
        <MediaButton data-icon-size={props['icon-size'] ?? 'default'} onClick={togglePlay} {...props} className={cn("play-pause data-[icon-size=large]:size-16", props.className)}>
            { isPlaying ? <PauseIcon /> : <PlayIcon /> }
        </MediaButton>
    )
}

function LikeButton(props) {
    const { globalState: { likedSongs: { songs, dispatch }, currentSong } } = useContext(GlobalContext);
    const [ liked, setLiked ] = useState(false); 
    const alreadyLiked = () => songs.findIndex(song => song.id === currentSong.id) > -1;
    
    function toggleLike() {
        if(!currentSong) return;
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
        <MediaButton
            className={cn('like', props.className)} 
            onClick={toggleLike}
            disabled={ currentSong.play_type !== 'trackplay' }
            { ...props }
        >
        {
            liked ?
            <HeartIcon /> : <HeartOutlineIcon />
        }
        </MediaButton>
    );
}

function Container(props) {
    return (
        <div {...props} 
            data-offset={props.offset} data-shadows={props.shadows} data-borders={props.borders}
            className={cn("controls-container-wrapper  flex w-full justify-evenly group/mediaControls", props.className)}
        >
        { props.children ??
            <>
                <InformationButton />
                <div className="group-data-[offset=true]/mediaControls:mt-4">
                    <PlayPauseButton icon-size="large" />
                </div>
                <LikeButton />
            </>
        }
        </div>
    );
}

export default {
    Container, LikeButton, InformationButton, PlayPauseButton, MediaButton
};