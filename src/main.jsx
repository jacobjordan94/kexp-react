import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Home from './pages/Home'
import Footer from './components/Footer.components'
import { Image } from './components/AlbumArt'
import Song from './pages/Song'
import SongListLayout from './layouts/SongListLayout'
import { SongList } from './components/SongList'
import NowPlayingLayout from './layouts/NowPlayingLayout'
import { Helmet } from 'react-helmet'
import useCurrentBackgroundStore from "@/store/useCurrentBackgroundStore";
import useRecentsStore from './store/useRecentsStore'
import useLikedSongsStore from './store/useLikedSongsStore'
import useStartup from './hooks/Startup'

const PRODUCTION = import.meta.env.PROD;
const Root = () => PRODUCTION ? <App /> : <StrictMode><App /></StrictMode>;
createRoot(document.getElementById('root')).render(
  <Root />
)

function App() {

  const likedSongs = useLikedSongsStore(store => store.songs);
  const recentSongs = useRecentsStore(store => store.recents);
  const currentBackground = useCurrentBackgroundStore(store => store.currentSong);
  const [ ready, error ] = useStartup();

  return( ready && !error &&
    <div className="app-root flex flex-col h-lvh w-lvw relative">
      <BrowserRouter>
        <section className='flex-grow overflow-y-scroll'>
          <Routes>
              <Route index element={<Home />} />
              <Route element={ <SongListLayout /> }>
                <Route path="/recents" element={
                  <>
                    <Helmet>
                      <title>KEXP - Recents</title>
                    </Helmet>
                    <SongList songs={recentSongs} />
                  </>
                } />
                <Route path="/likes"   element={
                  <>
                    <Helmet>
                      <title>KEXP - Liked Songs</title>
                    </Helmet>
                    <SongList songs={likedSongs}/>
                  </>
                } />
              </Route>
              <Route element={<NowPlayingLayout startClassName="flex-2/3 xl:flex-3/4" endClassName="hidden md:block flex-1/3 xl:flex-1/4" />}>
                <Route path="/song/:id" element={<Song />}/>
              </Route>
          </Routes>
        </section>
        <Footer />
      </BrowserRouter>
      <Image image={ currentBackground } className="background-image absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-2] blur-sm brightness-80" />
    </div>
  )
}
