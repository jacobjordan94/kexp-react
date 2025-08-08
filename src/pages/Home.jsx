import { useContext } from "react";
import { GlobalContext } from "../main";
import { HomeInformation } from "./Home.components";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home w-full h-full">
            <HomeInformation currentSong={currentSong} />
        </div>
    );
}

export default Home;