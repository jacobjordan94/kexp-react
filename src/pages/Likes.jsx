import { useContext } from "react";
import { GlobalContext } from "../main";
import { SongList } from "../components/SongList";

function Likes() {

    const { globalState: { likedSongs: { songs } } } = useContext(GlobalContext);

    return songs && <SongList songs={songs} />
}

export default Likes;