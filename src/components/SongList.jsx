import { useNavigate } from "react-router";
import { Image } from "./AlbumArt"
import { ArtistInformation, FullArtistInfo } from "./ArtistInformation.components";

export function SongList({ className, songs }) {
    return  (<div className={"song-list flex gap-4 sm:gap-0 flex-col sm:flex-row sm:flex-wrap p-2 sm:p-0 " + className}> {
                songs.map((song, i) => 
                    <div key={`${song.id}-${i}`} className="sm:flex-1/2 lg:flex-1/3 xl:flex-1/4 4xl:flex-1/6 sm:p-5.5">
                        <SongCard song={song} />
                    </div>
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
                      cursor-pointer flex gap-3 
                     sm:flex-col sm:h-full sm:p-0 overflow-hidden 
                     sm:gap-0 default-shadow shadow-xl group
                     sm:hover:scale-105 sm:mousedown:scale-100 sm:transition-[scale]"
            onClick={() => navigate('/song/' + song.id)}
        >
            <Image image={song.image_uri} className="min-w-16 rounded-md sm:rounded-none overflow-hidden sm:w-full sm:flex-grow sm:min-h-48 transition-transform sm:group-hover:transform-[scale(1.05)]">
                <div className="artist font-semibold text-lg hidden sm:flex h-full items-end p-2 bg-radial from-[rgba(0,0,0,0)] from-50% to-[rgba(0,0,0,0.5)] to-90%">
                        <ArtistInformation iconClass={'size-6'} artistName={song.artist} />
                </div>
            </Image>
            <div className="information-wrap sm:p-4">
                <FullArtistInfo song={song} sections={['artist', 'album', 'song']}
                                iconClass="size-6" textClass="font-semibold text-md" 
                                artistIconClass="sm:hidden" artistTextClass="sm:hidden text-lg"
                                albumIconClass="hidden sm:block" albumTextClass="hidden sm:block"
                />
            </div>
        </div>
    );
}