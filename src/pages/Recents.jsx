import { useContext } from "react";
import { GlobalContext } from "../main";
import { SongList } from "../components/SongList";

function Recents() {

    const { globalState: { recents } } = useContext(GlobalContext);

    return recents && <SongList songs={recents} />
}

export default Recents;
