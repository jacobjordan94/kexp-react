import { useContext } from "react";
import { GlobalContext } from "../main";
import { HomeButtons, HomeInformation } from "./Home.components";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home w-full h-full flex flex-col">
            <div className="home-information-wrapper flex-grow items-center justify-center flex flex-col">
                <HomeInformation currentSong={currentSong} />
                <HomeButtons currentSong={currentSong} />
            </div>
        </div>
    );
}

export default Home;