import { HomeInformation } from "./Home.components";
import Controls from "@/components/Controls";
import useCurrentSongStore from "@/store/useCurrentSongStore";
import { Helmet } from "react-helmet";

function Home() {
    const currentSong = useCurrentSongStore(store => store.currentSong);
    return (
        <>
            <Helmet>
                <title>KEXP - Home</title>
            </Helmet>
            <div className="page page-home w-full h-full flex flex-col p-6 gap-4">
                <HomeInformation currentSong={currentSong} />
                <div className="controls-wrapper flex flex-grow items-end sm:hidden">
                    <Controls.Container offset="true" shadows="true" />
                </div>
            </div>
        </>
    );
}

export default Home;