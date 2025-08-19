import { useNavigate } from "react-router";
import { Image } from "./AlbumArt"

export function SongList({ className, songs }) {
    return  (<div className={"song-list flex gap-4 flex-col sm:flex-row sm:flex-wrap " + className}> {
                songs.map((song, i) => 
                    <div className="sm:flex-1/3 lg:flex-1/4 xl:flex-1/5 4xl:flex-1/7">
                        <SongCard key={`${song.id}-${i}`} song={song} /></div>
                    )
            }</div>);
}

export function SongCard({ song }) {
    // Default - list-item, sm & above - card
    const navigate = useNavigate();
    return (
        <div 
            className="song-card p-2 backdrop-blur-2xl
                     rounded-lg transparent-border-dark 
                     border-4 cursor-pointer flex gap-3 sm:flex-col sm:h-full"
            onClick={() => navigate('/song/' + song.id)}
        >
            <Image image={song.image_uri} className="size-16 rounded-md overflow-hidden sm:w-full sm:h-48" />
            <div className="information-wrap flex flex-col">
                <div className="artist font-semibold text-lg">{ song.artist }</div>
                <div className="hidden sm:block album" >{ song.album  }</div>
                <div className="song text-sm"  >{ song.song   }</div>
            </div>
        </div>
    );
}