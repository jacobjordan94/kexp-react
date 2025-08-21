import AlbumArt, { ArtistImage } from "../components/AlbumArt";
import CommentBox from "../components/CommentBox";
import { Show } from "../components/CurrentShow.components";
import { ArtistInformation, FullArtistInfoWithLikeButton } from "../components/ArtistInformation.components";


export function SongBody({ song }) {
    return (
        <div className="song-body p-4 lg:w-full lg:h-full">
            <div className="top flex flex-col gap-4 lg:flex-row lg:h-full">
                <div className="flex flex-col lg:flex-1/2 row gap-4">
                    <div className="lg:flex-1/2">
                        <ArtistCard song={song} />
                    </div>
                    <div className="lg:flex-1/2">
                        <Show id={song.show} className="lg:h-full" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-1/2 gap-4">
                    <div className="lg:flex-1/2">
                        <DetailedSongInformation song={song} />
                    </div>
                    <div className="lg:flex-1/2">
                        <CommentBox comment={song.comment} className="backdrop-blur-xl lg:h-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ArtistCard({ song }) {
    return (
        <ArtistImage artistName={song.artist} className="size-full w-full h-96 lg:h-full flex rounded-2xl overflow-hidden bg-top">
            <div className="flex-grow flex items-end dark-alpha-3">
                <div className="p-4">
                    <ArtistInformation artistName={song.artist} iconClass={'size-7'} textClass={'text-2xl font-semibold'} />
                </div>
            </div>
        </ArtistImage>
    );
}

export function DetailedSongInformation({ song }) {
    return ( song &&
        <div className="detailed-song-information backdrop-blur-xl rounded-2xl p-2 border-4 transparent-border-dark lg:flex lg:flex-col lg:gap-4 lg:h-full">
            <AlbumArt image={song.image_uri} className="album-wrap hidden lg:block lg:h-full rounded-2xl" />                
            <FullArtistInfoWithLikeButton likeButtonSize="size-12" song={song} sections={['album', 'song']} iconClass={'size-6'} textClass={'text-lg font-semibold'} />
        </div>
    );
}