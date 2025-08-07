import { useContext } from "react";
import { GlobalContext } from "../main";

function Home() {

    const { globalState: { currentSong } } = useContext(GlobalContext);

    return (
        <div className="page page-home">
            THE PAGE
        </div>
    );
}

export default Home;