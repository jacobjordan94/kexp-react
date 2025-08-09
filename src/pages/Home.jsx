import { useContext } from "react";
import { GlobalContext } from "../main";
import { HomeButtons, HomeInformation } from "./Home.components";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home w-full h-full flex flex-col border-4 transparent-border-dark">
            <div className="home-information-wrapper flex-grow flex items-center justify-center">
                <div className="w-10/12 inline-flex flex-col gap-6">
                    <HomeInformation currentSong={currentSong} />
                    <HomeButtons currentSong={currentSong} />
                </div>
            </div>
        </div>
    );
}

export default Home;