import { useContext } from "react";
import { GlobalContext } from "../main";
import PictureWithInfo from "../components/PictureWithInfo";
import AlbumArt from "../components/AlbumArt";
import { useNavigate } from "react-router";

function Recents() {

    const { globalState: { recents } } = useContext(GlobalContext);

    return ( recents && 
        <div className="page page-recents flex flex-col gap-3 p-2">
        {
            recents.map((song, i) => <RecentCard key={i} song={song} />)
        }
        </div>
    );
}

const RecentCard = ({ song }) => {
    const navigate = useNavigate();
    
    return <div className="recent-card backdrop-blur-2xl rounded-lg p-1 transparent-border-dark border-4 cursor-pointer"
        onClick={() => navigate('/song/' + song.id)}
    >
        <PictureWithInfo
            image={song.thumbnail_uri || song.image_uri}
            title={song.artist}
            subtitle={song.song}
        ></PictureWithInfo>
    </div>
}

export default Recents;