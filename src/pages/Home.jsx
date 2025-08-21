import { useContext } from "react";
import { GlobalContext } from "../main";
import { HomeInformation } from "./Home.components";
import { Controls } from "../components/Controls";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home w-full h-full flex flex-col p-6 gap-4">
            <HomeInformation currentSong={currentSong} />
            <div className="controls-wrapper flex flex-grow items-end sm:hidden">
                <Controls shadow currentSong={currentSong} className={'flex w-full justify-evenly'} />
            </div>
        </div>
    );
}

export default Home;