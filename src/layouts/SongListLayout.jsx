import { Outlet } from "react-router";
import { Show } from "../components/CurrentShow.components";
import { useContext } from "react";
import { GlobalContext } from "../main";

export default function SongListLayout() {

    const { globalState: { currentShow } } = useContext(GlobalContext);

    return (
        <div 
            style={{'--tw-shadow-color': 'rgba(0, 0, 0, 0.5)'}}
            className="song-list-layout flex gap-4 h-full p-4 sm:p-0">
            <div className="list flex-2/3 xl:flex-3/4 overflow-y-scroll">
                <Outlet />
            </div>
            <div className="hidden md:flex flex-col gap-4 current-info flex-1/3 xl:flex-1/4 p-4 ps-0">
                <div className="side-title">
                    Now Playing
                </div>
                <div className="side-controls-container">
                    <Show show={currentShow} className="shadow-md" />
                </div>
            </div>
        </div>
    );
}
