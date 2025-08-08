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
                <div style={{'--tw-shadow-color': 'black'}} className="relative overflow-hidden backdrop-blur-2xl px-4 pt-4">
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

function PictureWithInfo({ image, title, subtitle, children }) {
    return (
        <div className="picture-with-info flex">
            <div className="image size-12 rounded-md overflow-hidden">
                <AlbumArt image={image} />
            </div>
            <div className="title-information flex-grow ps-4 font-semibold">
                <div className="title">
                    { title }
                </div>
                <div className="subtitle text-xs">
                    { subtitle }
                </div>
            </div>
            { children }
        </div>
    );
}

function NowPlaying({ currentSong }) {
    return ( currentSong &&
        <PictureWithInfo
            image={currentSong.thumbnail_uri}
            title={currentSong.artist || 'KEXP'}
            subtitle={currentSong.song || 'Airbreak'}
        />
    )
}

function CurrentShowMini({ currentShow }) {
    return ( currentShow &&
        <PictureWithInfo 
            image={currentShow.program_image_uri} 
            title={currentShow.program_name}
            subtitle={ currentShow.host_names.join(', ') }
        >
            <div className="show-host-image size-12 overflow-hidden rounded-full">
                <AlbumArt image={ currentShow.image_uri } />
            </div>
        </PictureWithInfo>
    )
}