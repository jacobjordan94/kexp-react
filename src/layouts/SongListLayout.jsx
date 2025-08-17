import { Outlet } from "react-router";
import { Show } from "../components/CurrentShow.components";
import { useContext } from "react";
import { GlobalContext } from "../main";

export default function SongListLayout() {

    const { globalState: { currentShow } } = useContext(GlobalContext);

    return (
        <div className="song-list-layout flex gap-4 px-4 h-full">
            <div className="list flex-2/3 overflow-y-scroll pt-4">
                <Outlet />
            </div>
            <div className="hidden md:block current-info flex-1/3 py-4">
                <Show show={currentShow} />
            </div>
        </div>
    );
}
