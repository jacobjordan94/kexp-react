import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../main";

function BaseLikeButton({ className, currentSong }) {
    const { globalState: { likedSongs: { songs, dispatch } } } = useContext(GlobalContext);
    const [ liked, setLiked ] = useState();

    function isLiked() {
        return songs.findIndex(song => song.id === currentSong.id) > -1;
    }

    function toggleLike() {
        if(liked) {
            dispatch({ type: 'remove', id: currentSong.id })
        } else {
            dispatch({ type: 'add', song: {...currentSong} });
        }
    }

    useEffect(() => {
        if(!currentSong || !songs) return;
        setLiked(isLiked());
    }, [ currentSong, songs ]);

    return currentSong &&
        <button disabled={currentSong.play_type !== 'trackplay'} className={'reset-padding song-like-button ' + className} onClick={toggleLike}>
            { liked ? <HeartIcon /> : <HeartOutlineIcon /> }
        </button>
}

export default BaseLikeButton;