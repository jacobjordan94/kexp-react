import { MusicalNoteIcon, UserIcon } from "@heroicons/react/24/solid";
import { ArtistImage, Image } from "../components/AlbumArt";
import CurrentShowMini from "../components/CurrentShow.components";
import BaseLikeButton from "../components/BaseLikeButton";
import CommentBox from "../components/CommentBox";
import { Controls } from "../components/Controls";
import PlayPauseButton from "../components/PlayPauseButton";
import { FullArtistInfoWithLikeButton } from "../components/ArtistInformation.components";

export function HomeInformation({ currentSong }) {
    return ( currentSong &&
        <div className="home-information-wrapper w-full rounded-2xl backdrop-blur-2xl p-4 flex gap-4 sm:w-full h-full lg:flex-col lg:justify-between lg:pe-0 default-shadow shadow-xl">
            <div className="w-full flex flex-col flex-grow lg:flex-row lg:flex-grow">
                <Image image={currentSong.image_uri} className="album-art-wrapper rounded-2xl border-4 transparent-border-light overflow-hidden flex-grow h-full lg:flex lg:items-center lg:justify-center">
                    <div className="hidden lg:inline">
                        <PlayPauseButton className="size-16" />
                    </div>
                </Image>
                <div className="flex flex-col flex-grow justify-between sm:flex-row sm:grow-0 pt-4 lg:pt-0 lg:grow-0 lg:px-8 lg:flex-col lg:justify-end lg:min-w-lg lg:gap-6">
                    <div className="hidden lg:flex flex-col flex-grow gap-4">
                        <ArtistImage artistName={currentSong.artist} className="h-full rounded-2xl border-4 transparent-border-light" />
                        <CommentBox comment={currentSong.comment} className="block max-w-lg max-h-[256px] overflow-y-scroll" />
                    </div>
                    <FullArtistInfoWithLikeButton song={currentSong} sections={[ 'artist', 'song' ]} 
                                                    artistIconClass={'size-8'} artistTextClass={'font-semibold text-2xl'}
                                                    songIconClass={'size-6'} songTextClass={'ps-2 text-xl'} likeButtonSize="size-12" likeButtonClassName="hidden lg:block"
                    />
                    <div className="hidden lg:block">
                        <CurrentShowMini size="size-16" titleClass="text-lg max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap" subtitleClass="text-md max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap" />
                    </div>
                    <Controls offset={false} className="hidden gap-6 sm:flex items-center lg:hidden" currentSong={currentSong}></Controls>
                </div>
            </div>
        </div>
    );
}

const SongInformation = ({ currentSong, className }) =>
    <div className={"information-wrapper whitespace-nowrap " + className}>
        <div className="text-wrapper">
            <div className="artist text-2xl flex flex-row items-center">
                <div className="icon size-10 flex items-center justify-center me-2">
                    <UserIcon className="size-8" />
                </div>
                <div className="overflow-hidden">
                    { currentSong.artist || 'KEXP' }
                </div>
            </div>
            <div className="song text-lg flex flex-row items-center mt-0.5">
                <div className="icon w-10 flex justify-center me-2">
                    <MusicalNoteIcon className="size-4" />
                </div>
                { currentSong.song || 'Airbreak' }
            </div>
        </div>
    </div>

