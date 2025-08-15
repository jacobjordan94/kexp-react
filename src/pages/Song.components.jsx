import { ArtistImage } from "../components/AlbumArt";

export function SongBody({ song }) {
    return (
        <div className="song-body p-4">
            <div className="top flex flex-col">
                <ArtistImage artistName={song.artist} className="size-full w-full h-64"></ArtistImage>
                <div className="artist-name">
                    { song.song }
                </div>
            </div>
        </div>
    )
}