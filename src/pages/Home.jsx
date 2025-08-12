import { useContext } from "react";
import { GlobalContext } from "../main";
import { HomeButtons, HomeInformation } from "./Home.components";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home w-full h-full flex flex-col border-4 transparent-border-dark p-6 gap-4">
            <HomeInformation currentSong={currentSong} />
            <div className="controls-wrapper flex flex-grow items-end sm:hidden">
                <HomeButtons className="flex flex-row w-full justify-evenly" currentSong={currentSong} />
            </div>
        </div>
    );
}

export default Home;