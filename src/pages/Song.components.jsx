import { CloudIcon, MusicalNoteIcon, UserIcon } from "@heroicons/react/24/solid";
import { ArtistImage } from "../components/AlbumArt";
import BaseLikeButton from "../components/BaseLikeButton";
import CommentBox from "../components/CommentBox";
import { Show } from "../components/CurrentShow.components";


export function SongBody({ song }) {
    return (
        <div className="song-body p-4">
            <div className="top flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-0 lg:*:flex-1/2">
                <ArtistCard song={song} />
                <DetailedSongInformation song={song} />
                <CommentBox comment={song.comment} className="backdrop-blur-xl" />
                <Show id={song.show} />
            </div>
        </div>
    )
}

function ArtistCard({ song }) {
    return (
        <ArtistImage artistName={song.artist} className="size-full w-full h-64 flex rounded-2xl overflow-hidden bg-top">
            <div className="flex-grow flex items-end dark-alpha-3">
                <ArtistName name={song.artist} />
            </div>
        </ArtistImage>
    );
}

function ArtistName({ name }) {
    return (
        <div className="artist-name px-4 pb-2">
            <span className="text-2xl font-semibold">
                { name }
            </span>
        </div>
    );
}

function IconWrap({ className, children }) {
    return <div className={"icon-wrap inline-flex items-center justify-center " + className}>
        { children }
    </div>
}

export function DetailedSongInformation({ song }) {

    const ArtistIcon = () => <IconWrap className='size-8'>
                                 <UserIcon className="size-8" />
                             </IconWrap>;
    const SongIcon   = () => <IconWrap className='size-6'>
                                 <CloudIcon className="size-6" />
                             </IconWrap>
    const AlbumIcon  = () => <IconWrap className='size-6'>
                                 <MusicalNoteIcon className="size-6" />
                             </IconWrap>

    return ( song &&
        <div className="detailed-song-information backdrop-blur-xl rounded-2xl p-2 border-4 transparent-border-dark">
            <div className="flex gap-6 justify-between">
                <div className="text-wrapper">
                    { song.album && 
                        <TextWithIcon Icon={() => <SongIcon /> }>
                            <span className="text-lg">
                                { song.album }                
                            </span>
                        </TextWithIcon> 
                    }
                    <TextWithIcon Icon={() => <AlbumIcon /> } iconContainerClassName={'flex items-center'}>
                        <span className="text-lg">
                            { song.song }
                        </span>
                    </TextWithIcon>
                </div>
                <div className="like-button-wrapper flex items-center pe-2">
                    <BaseLikeButton currentSong={song} className="size-8" />
                </div>
            </div>
        </div>
    );
}

function TextWithIcon({ Icon, text, className, children, iconContainerClassName }) {
    return ( 
        <div className={"text-with-icon flex gap-4 " + className}>
            <div className={"icon-container " + iconContainerClassName}>
                <Icon></Icon>
            </div>
            <div className="text-container flex items-center">
                { text || children }
            </div>
        </div>
    );
}