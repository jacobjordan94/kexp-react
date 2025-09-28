import { HeartIcon, InformationCircleIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import useCurrentSongStore from "@/store/useCurrentSongStore";
import useIsLiked from "@/hooks/IsLiked";
import LikeSongButton from "@/components/primitives/like-song";
import PlayPauseButtonPrimitive from "@/components/primitives/play-pause";

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
    const currentSong = useCurrentSongStore(store => store.currentSong);
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
    return (
        <PlayPauseButtonPrimitive asChild
            data-icon-size={props['icon-size'] ?? 'default'} 
            {...props} 
            className={cn("play-pause", props.className)
        }>
            <MediaButton className="*:hidden">
                <PlayIcon  className="group-data-[is-playing=false]/playPauseButton:flex" />
                <PauseIcon className="group-data-[is-playing=true]/playPauseButton:flex"  />
            </MediaButton>
        </PlayPauseButtonPrimitive>
    )
}

function LikeButton(props) {
    const currentSong = useCurrentSongStore(store => store.currentSong);
    const liked = useIsLiked(currentSong);

    return ( currentSong &&
        <LikeSongButton asChild song={currentSong} 
            className={cn('like', props.className)} 
            disabled={ currentSong.play_type !== 'trackplay' }
            { ...props }
        >
            <MediaButton>
            {
                liked ?
                <HeartIcon /> : <HeartOutlineIcon />
            }   
            </MediaButton>
        </LikeSongButton>
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