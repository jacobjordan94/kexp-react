import { Children, createContext, StrictMode, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router'
import Home from './pages/Home'
import useCurrentSong from './hooks/CurrentSong'

export const GlobalContext = createContext();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  const [ globalState, setGlobalState ] = useState({
    currentSong: null,
  });
  const [ currentSong ] = useCurrentSong();
  const [ currentPage, setCurrentPage ] = useState();

  useEffect(() => {
    setGlobalState(oldState => ({ ...oldState, currentSong }));
  }, [ currentSong ]);

  function onNavigate() {

  }
  
  return(
    currentSong && 
    <div className="app-root flex flex-col h-lvh w-lvw">
      <BrowserRouter>
          <GlobalContext value={{ globalState, setGlobalState }}>
            <section className='flex-grow'>
              <Routes>
                  <Route index element={<Home />} />
              </Routes>
            </section>
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </GlobalContext>
      </BrowserRouter>
    </div>
  )
}

function Footer({ currentPage, setCurrentPage }) {

  const navigate = useNavigate();
  function onNavigate(page) {
    navigate('/' + page);
    setCurrentPage(page);
  }
  const NavigationButton = ({ to, name }) => 
    <button onClick={() => onNavigate(to)}>{ name }</button>

  return (
    <footer className=''>
      <div className="footer-wrap w-[33rem] m-[auto]">
        { !(currentPage === '') && <NowPlaying /> }
        <div className="navigation-buttons flex justify-center gap-12 p-4">
          <div className="button-wrap">
            <NavigationButton name='Likes' to='likes' />
          </div>
          <div className="button-wrap">
            <NavigationButton name='Home' to='' />
          </div>
          <div className="button-wrap">
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
    <div className='now-playing flex'>
      <div className="album-art rounded-lg overflow-hidden">
        <img className='size-16' src={ currentSong.thumbnail_uri } alt="" />
      </div>
      <div className="info flex flex-col ps-4">
        <div className='artist-name flex-auto text-lg'>{ currentSong.artist }</div>
        <div className='track-name flex-auto'>{ currentSong.song }</div>
      </div>
    </div>
  );

}