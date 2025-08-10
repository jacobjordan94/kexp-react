import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Home from './pages/Home'
import Footer from './components/Footer.components'
import Recents from './pages/Recents'
import AlbumArt from './components/AlbumArt'
import useGlobals from './hooks/Globals'
import Likes from './pages/Likes'
import Song from './pages/Song'

export const GlobalContext = createContext();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  const [ globalState, setGlobalState ] = useGlobals();
  const [ currentPage, setCurrentPage ] = useState(
    location.pathname
  );

  return(
    globalState.currentSong && 
    <div className="app-root flex flex-col h-lvh w-lvw relative">
      <BrowserRouter>
        <GlobalContext value={{ globalState, setGlobalState }}>
          <section className='flex-grow overflow-y-scroll'>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/recents" element={<Recents />} />
                <Route path="/likes"   element={<Likes />} />
                <Route path="/song/:id" element={<Song />}/>
            </Routes>
          </section>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} currentShow={globalState.currentShow} />
        </GlobalContext>
      </BrowserRouter>
      <div className="background-image absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1] blur-sm brightness-80">
        <AlbumArt image={globalState.currentSong.image_uri}/>
      </div>
    </div>
  )
}