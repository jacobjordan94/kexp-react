import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Home from './pages/Home'
import useCurrentSong from './hooks/CurrentSong'
import Footer from './components/Footer.components'

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