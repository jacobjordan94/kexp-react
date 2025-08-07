import { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main";

export default function Footer({ currentPage, setCurrentPage }) {

  const navigate = useNavigate();
  function onNavigate(page) {
    navigate('/' + page);
    setCurrentPage(page);
  }
  const NavigationButton = ({ to, name }) => 
    <button 
        className='w-full h-full rounded-none' 
        onClick={() => onNavigate(to)}
    >{ name }</button>

  return (
    <footer className=''>
      <div className="footer-wrap my-0">
        { !(currentPage === '') && <NowPlaying /> }
        <div className="navigation-buttons flex">
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Likes' to='likes' />
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Home' to='' />
          </div>
          <div className="button-wrap flex-1/3">
            <NavigationButton name='Recents' to='recents' />
          </div>
        </div>
      </div>
    </footer>
  );
}

function NowPlaying() {
  const { globalState: { currentSong } } = useContext(GlobalContext);
  return ( currentSong && 
    <div className='now-playing flex px-4 py-1.5'>
      <div className="album-art rounded-lg overflow-hidden">
        { currentSong.thumbnail_uri && <img className='size-16' src={ currentSong.thumbnail_uri } alt="" /> }
      </div>
      <div className="info flex flex-col ps-4 text-wrap">
        <div className='artist-name flex-auto text-lg'>{ currentSong.artist }</div>
        <div className='track-name flex-auto'>{ currentSong.song }</div>
      </div>
    </div>
  );

}