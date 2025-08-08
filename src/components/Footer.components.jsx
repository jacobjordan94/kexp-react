import { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main";
import { HeartIcon, HomeIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon, HomeIcon as HomeOutlineIcon, QueueListIcon as QueueListOutlineIcon } from "@heroicons/react/24/outline";

export default function Footer({ currentPage, setCurrentPage }) {

    const { globalState: { currentSong } } = useContext(GlobalContext);
  
    const navigate = useNavigate();
    function onNavigate(page) {
        navigate(page);
        setCurrentPage(page);
    }

    return ( currentSong &&
        <footer className=''>
            <div className="footer-wrap">
                <div style={{'--tw-shadow-color': 'black'}} className="relative overflow-hidden backdrop-blur-sm">
                    <div className="controls">
                        { !(currentPage === '/') && <NowPlaying currentSong={currentSong} /> }
                        <Navigation currentPage={currentPage} onNavigate={onNavigate} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function Navigation({ currentPage, onNavigate }) {
    const NavigationButton = ({ to, name, children }) => {
        return <button 
            className='w-full h-full rounded-none' 
            onClick={() => onNavigate(to)}
        >
            <div className="button-wrap flex flex-col items-center">
                <div className="icon-wrap">{ children }</div>
                <div className="name font-semi-bold">{ name }</div>
            </div>
        </button>;
    }

    return(
        <div className="navigation-buttons flex">
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Likes' to='/likes'>
                { currentPage === '/likes' ? <HeartIcon className="size-8" /> : <HeartOutlineIcon className="size-8" /> }
            </NavigationButton>
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Home' to='/' >
                { currentPage === '/' ? <HomeIcon className="size-8" /> : <HomeOutlineIcon className="size-8" /> }
            </NavigationButton>
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Recents' to='/recents'>
                { currentPage === '/recents' ? <QueueListIcon className="size-8" /> : <QueueListOutlineIcon className="size-8" /> }
            </NavigationButton>
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
