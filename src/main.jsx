import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
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

  useEffect(() => {
    setGlobalState(oldState => ({ ...oldState, currentSong }));
  }, [ currentSong ]);
  
  return(
    currentSong && 
    <BrowserRouter>
      <GlobalContext value={{ globalState, setGlobalState }}>
        <Routes>
            <Route index element={<Home />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  )
}
