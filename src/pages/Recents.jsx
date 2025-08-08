import { useEffect } from "react";
import useRecents from "../hooks/Recents";
import AlbumArt from "../components/AlbumArt";

function Recents() {

    const [ recents ] = useRecents();

    return ( recents && 
        <div className="page page-recents flex flex-col gap-2 p-2">
        {
            recents.map((song, i) => <RecentCard key={i} song={song} />)
        }
        </div>
    );
}

const RecentCard = ({ song }) => {
    return ( song && 
        <div className="recent-card flex rounded-xl p-2 backdrop-blur-md">
            <div className="album-art-wrapper rounded-md overflow-hidden pe-2">
                <div className="size-16">
                    <AlbumArt image={song.image_uri} />
                </div>
            </div>
            <div className="info">
                <div className="artist-name text-lg">{ song.artist }</div>
                <div className="song-name"  >{ song.song }</div>
            </div>
        </div>
    );
};

export default Recents;