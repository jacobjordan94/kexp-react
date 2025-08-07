import { useEffect } from "react";
import useRecents from "../hooks/Recents";

function Recents() {

    const [ recents ] = useRecents();
    useEffect(() => {
        console.log('recents', recents);
    }, [recents])

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
        <div className="recent-card flex rounded-xl dark-alpha-5 p-2">
            <div className="album-art-wrapper rounded-md overflow-hidden pe-2">
                <AlbumArt image={song.image_uri} />
            </div>
            <div className="info">
                <div className="artist-name text-lg">{ song.artist }</div>
                <div className="song-name"  >{ song.song }</div>
            </div>
        </div>
    );
};

function AlbumArt({ image, size = 16 }) {
    return <div className={"album-art inline-flex items-center justify-center bg-neutral-800 size-" + size}>
    { 
        image === '' ? 
            <span className="text-neutral-700 text-4xl">?</span> : 
            <img className="w-full h-full object-cover" src={image} />
    }
    </div>
}

export default Recents;