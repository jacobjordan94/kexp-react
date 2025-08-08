import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main";
import { HeartIcon, HomeIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon, HomeIcon as HomeOutlineIcon, QueueListIcon as QueueListOutlineIcon } from "@heroicons/react/24/outline";
import AlbumArt from "./AlbumArt";

export default function Footer({ currentPage, setCurrentPage, currentShow }) {

    const { globalState: { currentSong } } = useContext(GlobalContext);
  
    const navigate = useNavigate();
    function onNavigate(page) {
        navigate(page);
        setCurrentPage(page);
    }

    return ( currentSong &&
        <footer className=''>
            <div className="footer-wrap">
                <div style={{'--tw-shadow-color': 'black'}} className="relative overflow-hidden">
                    <div className="controls">
                        { (currentPage === '/') ? <CurrentShowMini currentShow={currentShow} /> : <NowPlaying currentSong={currentSong} /> }
                        <Navigation currentPage={currentPage} onNavigate={onNavigate} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function Navigation({ currentPage, onNavigate }) {
    const NavigationButton = ({ to, name, DefaultIcon, ActiveIcon }) => {
        return <button 
            className={`navigation-button w-full h-full rounded-none ease-in-out duration-150 transition-transform transform-[scale(${ currentPage === to ? 1.1 : 0.9 })]`} 
            onClick={() => onNavigate(to)}
        >
            <div className="navigation-button-wrap flex flex-col items-center">
                <div className="icon-wrap">
                {
                    currentPage === to ? <ActiveIcon className='size-8' /> : <DefaultIcon className="size-8" />
                }
                </div>
                <div className="name font-semi-bold">{ name }</div>
            </div>
        </button>;
    }

    return(
        <div className="navigation-buttons flex">
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Likes' to='/likes' DefaultIcon={HeartOutlineIcon} ActiveIcon={HeartIcon} />
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Home' to='/' DefaultIcon={HomeOutlineIcon} ActiveIcon={HomeIcon} />
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Recents' to='/recents' DefaultIcon={QueueListOutlineIcon} ActiveIcon={QueueListIcon} />
          </div>
        </div>
    );
}

function NowPlaying({ currentSong }) {

    return ( currentSong && 
    <div className="now-playing flex p-4 pb-0">
        <div className="album-art rounded-lg overflow-hidden">
        { currentSong.thumbnail_uri && <img className='size-16' src={ currentSong.thumbnail_uri } alt="" /> }
        </div>
        <div className="info flex flex-col ps-4">
            <div className='artist-name text-lg'>
                { currentSong.artist }
            </div>
            <div className='track-name flex-auto'>
                { currentSong.song }
            </div>
        </div>
    </div>
    );
}


function CurrentShowMini({ currentShow }) {
    useEffect(() => { console.log(currentShow) }, [ currentShow ])
    return (
        currentShow && 
        <div className="current-show-mini flex px-4">
            <div className="show-image size-12 rounded-md overflow-hidden">
                <AlbumArt image={currentShow.program_image_uri} />
            </div>
            <div className="show-information flex-grow ps-4 font-semibold">
                <div className="show-name">
                    { currentShow.program_name }
                </div>
                <div className="host-names text-xs">
                    { currentShow.length === 1 ? currentShow.host_names[0] : currentShow.host_names.join(', ') }
                </div>
            </div>
            <div className="show-host-image size-12 overflow-hidden rounded-full">
                <AlbumArt image={ currentShow.image_uri } />
            </div>
        </div>
    )
};