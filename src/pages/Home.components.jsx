import { 
    ChatBubbleBottomCenterTextIcon, 
    MusicalNoteIcon, 
    UserIcon,
    HeartIcon,
    PlayIcon,
    PauseIcon,
} from "@heroicons/react/24/solid";
import { 
    ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
    HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/24/outline';
import { Image } from "../components/AlbumArt";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../main";
import CurrentShowMini from "../components/CurrentShow.components";
import BaseLikeButton from "../components/BaseLikeButton";

export function HomeInformation({ currentSong }) {
    return ( currentSong &&
        <div className="home-information-wrapper w-full rounded-2xl backdrop-blur-2xl p-4 flex gap-4 border-4 transparent-border-dark sm:w-full h-full lg:flex-col lg:justify-between">
            <div className="w-full flex flex-col flex-grow lg:flex-row lg:flex-grow">
                <Image image={currentSong.image_uri} className="album-art-wrapper rounded-2xl border-4 transparent-border-light overflow-hidden flex-grow h-full lg:flex lg:items-center lg:justify-center">
                    <PlayPauseButton />
                </Image>
                <div className="flex flex-col flex-grow justify-between sm:flex-row sm:grow-0 pt-4 lg:pt-0 lg:grow-0 lg:px-8 lg:flex-col lg:justify-end lg:min-w-lg lg:gap-6">
                    <div class="song-information-wrapper contents lg:flex lg:flex-row lg:justify-between items-center">
                        <SongInformation currentSong={currentSong} />
                        <div className="like-wrapper hidden lg:block hover:animate-pulse">
                            <BaseLikeButton className=" size-12" currentSong={currentSong} />
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <CurrentShowMini size="size-16" titleClass="text-lg max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap" subtitleClass="text-md max-w-2xs overflow-hidden overflow-ellipsis whitespace-nowrap" />
                    </div>
                    <HomeButtons offset={false} className="hidden gap-6 sm:flex items-center lg:hidden" currentSong={currentSong}></HomeButtons>
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

const HomeButton = ({ className, onClick, children, disabled = false }) => 
    <div className="home-button-wrap">
        <div className="rounded-full overflow-hidden backdrop-blur-2xl inline-flex transparent-border-dark border-2">
            <button disabled={disabled} className={'home-button reset-padding disabled:opacity-75 disabled:blur-2 ' + className} 
                    onClick={onClick}
            >
                <div className="p-2">
                    { children }
                </div>
            </button>
        </div>
    </div>

function InformationButton({ currentSong })  {
    function onClick() {
        console.log(currentSong.comment);
    }
    return ( currentSong &&
        <HomeButton 
            className={'information size-12'} 
            onClick={onClick}
            disabled={ !currentSong.comment || currentSong.comment === '' || currentSong.play_type === 'airbreak' }
        >
        {
            currentSong.comment && currentSong.comment !== '' ?     
            <ChatBubbleBottomCenterTextIcon /> :
            <ChatBubbleBottomCenterTextOutlineIcon />
        }
        </HomeButton>
    );
}

function PlayPauseButton({ onClick }) {
    const [ audioIsPlaying, setAudioIsPlaying ] = useState(false);
    return (
        <HomeButton className={'play-pause size-16'} onClick={() => setAudioIsPlaying(!audioIsPlaying)}>
        {
            audioIsPlaying ? <PauseIcon /> : <PlayIcon />
        }
        </HomeButton>
    );
}

function LikeButton({ currentSong }) {
    const { globalState: { likedSongs: { songs, dispatch } } } = useContext(GlobalContext);
    const [ liked, setLiked ] = useState(false); 
    const alreadyLiked = () => songs.findIndex(song => song.id === currentSong.id) > -1;
    
    function toggleLike() {
        if(alreadyLiked()) {
            dispatch({ type: 'remove', id: currentSong.id })
        } else {
            dispatch({ type: 'add', song: {...currentSong} });
        }
    }

    useEffect(() => {
        if(!songs && !currentSong) return;
        if(alreadyLiked()) {
            setLiked(true);
        } else { setLiked(false); }
    }, [ songs, currentSong ]);

    return ( currentSong && songs &&
        <HomeButton 
            className={'like size-12'} 
            onClick={toggleLike}
            disabled={ currentSong.play_type !== 'trackplay' }
        >
        {
            liked ?
            <HeartIcon /> : <HeartOutlineIcon />
        }
        </HomeButton>
    );
}

export function HomeButtons({ currentSong, className, offset = true }) {
    return (
        <div className={"home-buttons-wrapper " + className}>
            <InformationButton currentSong={currentSong} />
            <div className={offset ? 'mt-4' : ''}>
                <PlayPauseButton />
            </div>
            <LikeButton currentSong={currentSong} />
        </div>
    );
}