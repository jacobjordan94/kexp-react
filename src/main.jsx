import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Home from './pages/Home'
import useCurrentSong from './hooks/CurrentSong'
import Footer from './components/Footer.components'
import Recents from './pages/Recents'

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
  const [ currentPage, setCurrentPage ] = useState(
    location.pathname
  );
  useEffect(() => {
    setGlobalState(oldState => ({ ...oldState, currentSong }));
  }, [ currentSong ]);

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
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </GlobalContext>
      </BrowserRouter>
      {
        (currentSong.image_uri !== '') &&
        <div className="background-image absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1] blur-sm">
          <img className='w-full h-full object-cover' src={ currentSong.image_uri } />
        </div>
      }
    </div>
  )
}