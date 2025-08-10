import { useContext } from "react";
import { GlobalContext } from "../main";
import PictureWithInfo from "../components/PictureWithInfo";
import { useNavigate } from "react-router";

function Likes() {

    const { globalState: { likedSongs: { songs, dispatch } } } = useContext(GlobalContext);

    return ( songs && 
        <div className="page page-likes flex flex-col gap-3 p-2">
        {
            songs.map((song, i) => <LikesCard key={i} song={song} />)
        }
        </div>
    );
}

const LikesCard = ({ song }) => {
    const naviagte = useNavigate();
    return <div 
        className="recent-card backdrop-blur-2xl rounded-lg p-2 transparent-border-dark border-4 cursor-pointer"
        onClick={() => naviagte('/song/' + song.id)}
    >
        <PictureWithInfo
            image={song.thumbnail_uri}
            title={song.artist}
            subtitle={song.song}
        ></PictureWithInfo>
    </div>
}

export default Likes;