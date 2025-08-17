import { useNavigate } from "react-router";
import { Image } from "./AlbumArt"

export function SongList({ className, songs }) {
    return  (<div className={"song-list flex gap-4 flex-col p-4 " + className}> {
                songs.map(song => <SongCard key={song.id} song={song} />)
            }</div>);
}

export function SongCard({ song }) {
    const navigate = useNavigate();
    return (
        <div 
            className="song-card p-2 backdrop-blur-2xl
                     rounded-lg transparent-border-dark 
                     border-4 cursor-pointer flex gap-3"
            onClick={() => navigate('/song/' + song.id)}
        >
            <Image image={song.thumbnail_uri} className="size-16 rounded-md overflow-hidden" />
            <div className="information-wrap flex flex-col flex-grow justify-evenly">
                <div className="artist font-semibold text-lg">{ song.artist }</div>
                <div className="hidden album" >{ song.album  }</div>
                <div className="song text-sm"  >{ song.song   }</div>
            </div>
        </div>
    );
}