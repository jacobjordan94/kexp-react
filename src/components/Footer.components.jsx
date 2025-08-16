import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GlobalContext } from "../main";
import { HeartIcon, HomeIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon, HomeIcon as HomeOutlineIcon, QueueListIcon as QueueListOutlineIcon } from "@heroicons/react/24/outline";
import PictureWithInfo from "./PictureWithInfo";
import PlayPauseButton from "./PlayPauseButton";
import CurrentShowMini from "./CurrentShow.components";

export default function Footer({}) {

    const { globalState: { currentSong, currentShow } } = useContext(GlobalContext);
    const [ currentPath, setCurrentPath ] = useState();
    const loc = useLocation();
  
    const navigate = useNavigate();
    function onNavigate(page) {
        navigate(page);
    }

    useEffect(() => {
        if(!loc) return;
        const path = loc.pathname === '/' ? '/' : ('/' + loc.pathname.split('/')[1]);
        setCurrentPath(path);
    }, [ loc ]);

    return ( currentSong &&
        <footer className=''>
            <div className="footer-wrap">
                <div style={{'--tw-shadow-color': 'black'}} className="relative overflow-hidden backdrop-blur-2xl px-4 pt-4">
                    <div className="controls">
                        { (currentPath === '/') ? 
                            <div className="sm:hidden">
                                <CurrentShowMini currentShow={currentShow} /> 
                            </div> :
                            <NowPlaying currentSong={currentSong} /> }
                        <Navigation currentPage={currentPath} onNavigate={onNavigate} />
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
        <PictureWithInfo
            image={currentSong.thumbnail_uri}
            title={currentSong.artist || 'KEXP'}
            subtitle={currentSong.song || 'Airbreak'}
        >
            <div className="play-pause-wrap size-12 inline-flex items-center justify-center">
                <PlayPauseButton className="size-8" />
            </div>
        </PictureWithInfo>
    )
}
