import { useContext } from "react";
import { GlobalContext } from "../main";

function Home() {

    const { globalState } = useContext(GlobalContext);

    return <div>
        { JSON.stringify(globalState.currentSong) }
    </div>
}

export default Home;