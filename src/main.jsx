import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Home from './pages/Home'
import useCurrentSong from './hooks/CurrentSong'
import Footer from './components/Footer.components'
import Recents from './pages/Recents'
import AlbumArt from './components/AlbumArt'
import useCurrentShow from './hooks/CurrentShow'
import useRecents from './hooks/Recents'

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
  const [ currentShow, refreshCurrentShow ] = useCurrentShow();
  const [ currentSong ] = useCurrentSong();
  const [ recents, setRecents ] = useRecents();
  const [ currentPage, setCurrentPage ] = useState(
    location.pathname
  );

  useEffect(() => {
    if(!currentSong && !globalState && !recents) return;
    if(currentSong && globalState.currentSong && currentSong.show !== globalState.currentSong.show) refreshCurrentShow();
    if(currentSong && recents && currentSong.play_type === 'trackplay') setRecents(old => [ {...currentSong}, ...old]);
    setGlobalState(oldState => ({ ...oldState, currentSong }));
  }, [ currentSong ]);

  useEffect(() => {
    if(!currentShow) return;
    setGlobalState(oldState => ({...oldState, currentShow}));
  }, [ currentShow ]);

  useEffect(() => {
    if(!recents) return;
    setGlobalState(oldState => ({ ...oldState, recents }));
  }, [ recents ]);

  return(
    currentSong && 
    <div className="app-root flex flex-col h-lvh w-lvw relative">
      <BrowserRouter>
        <GlobalContext value={{ globalState, setGlobalState }}>
          <section className='flex-grow overflow-y-scroll'>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/recents" element={<Recents />} />
            </Routes>
          </section>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} currentShow={currentShow} />
        </GlobalContext>
      </BrowserRouter>
      <div className="background-image absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1] blur-sm brightness-80">
        <AlbumArt image={currentSong.image_uri}/>
      </div>
    </div>
  )
}