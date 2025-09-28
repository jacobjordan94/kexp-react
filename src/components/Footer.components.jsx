import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { HeartIcon, HomeIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon, HomeIcon as HomeOutlineIcon, QueueListIcon as QueueListOutlineIcon } from "@heroicons/react/24/outline";
import PictureWithInfo from "@/components/PictureWithInfo";
import CurrentShowMini from "@/components/CurrentShow.components";
import useCurrentSongStore from "@/store/useCurrentSongStore";
import useCurrentShowStore from "@/store/useCurrentShowStore";
import PlayPauseButtonPrimitive from "@/components/primitives/play-pause";

export default function Footer({}) {

    const currentSong = useCurrentSongStore(store => store.currentSong);
    const currentShow = useCurrentShowStore(store => store.currentShow);
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
        <footer style={{ boxShadow: 'rgba(0,0,0,0.5) 0 -4px 10px 0' }}>
            <div className="footer-wrap">
                <div className="relative overflow-hidden backdrop-blur-2xl px-4">
                    <div className="controls">
                        { (currentPath === '/') ? 
                            <div className="pt-4 sm:hidden">
                                <CurrentShowMini currentShow={currentShow} /> 
                            </div> :
                            <div className="pt-4 md:hidden">
                                <NowPlaying currentSong={currentSong} /> 
                            </div> }
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
            <PlayPauseButtonPrimitive className="p-2" />
        </PictureWithInfo>
    )
}
