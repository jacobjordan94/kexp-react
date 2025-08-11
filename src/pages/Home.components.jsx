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
import AlbumArt from "../components/AlbumArt";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../main";

export function HomeInformation({ currentSong }) {

    return ( currentSong &&
        <div className="home-information-wrapper w-full rounded-2xl backdrop-blur-2xl p-4 flex gap-4 border-4 transparent-border-dark sm:w-full sm:h-full lg:flex-col lg:justify-between">
            <div className="sm:w-full sm:flex sm:flex-col lg:flex-row">
                <div className="album-art-wrapper rounded-2xl border-4 transparent-border-light overflow-hidden sm:flex-grow">
                    <AlbumArt className="w-full h-full object-cover lg:w-auto lg:h-auto" image={currentSong.image_uri}></AlbumArt>
                </div>
                <div className="flex flex-col flex-grow justify-between sm:flex-row pt-4 lg:grow-0">
                    <SongInformation currentSong={currentSong} />
                    <HomeButtons offset={false} className="hidden gap-6 sm:flex items-center lg:hidden" currentSong={currentSong}></HomeButtons>
                </div>
            </div>
            <div className="bottom hidden lg:flex justify-center">
                <div className="controls-wrap">
                    <HomeButtons offset={false} currentSong={currentSong} className="gap-16 flex" />
                </div>
            </div>
        </div>
    );
}

const SongInformation = ({ currentSong, className }) => 
    <div className={"information-wrapper whitespace-nowrap " + className}>
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