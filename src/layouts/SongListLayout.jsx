import { Outlet } from "react-router";
import { Show } from "../components/CurrentShow.components";
import { useContext } from "react";
import { GlobalContext } from "../main";

export default function SongListLayout() {

    const { globalState: { currentShow } } = useContext(GlobalContext);

    return (
        <div className="song-list-layout flex gap-4 px-4 h-full">
            <div className="list flex-2/3 xl:flex-3/4 overflow-y-scroll py-4">
                <Outlet />
            </div>
            <div className="hidden md:block current-info flex-1/3 xl:flex-1/4 py-4">
                <div className="side-controls-container">
                    <Show show={currentShow} />
                </div>
            </div>
        </div>
    );
}
