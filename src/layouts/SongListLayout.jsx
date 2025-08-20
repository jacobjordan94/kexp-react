import { Outlet } from "react-router";
import { Show } from "../components/CurrentShow.components";
import { useContext } from "react";
import { GlobalContext } from "../main";
import CommentBox from "../components/CommentBox";
import { ArtistImage, Image } from "../components/AlbumArt";
import { Controls } from "../components/Controls";

export default function SongListLayout() {

    const { globalState: { currentShow, currentSong } } = useContext(GlobalContext);

    return (
        <div 
            className="song-list-layout flex gap-4 h-full p-4 sm:p-0">
            <div className="list flex-2/3 xl:flex-3/4 overflow-y-scroll">
                <Outlet />
            </div>
            <div className="hidden md:flex flex-col gap-4 current-info flex-1/3 xl:flex-1/4 p-4 ps-0 h-full">
                <div className="shadow-[rgba(0,0,0,0.5)\ 0px\ 4px\ 6px] shadow-xl side-title dark-alpha-1 text-2xl backdrop-blur-2xl p-4 rounded-2xl ">
                    Now Playing
                </div>
                <div className="side-controls-container flex flex-col gap-4 flex-grow">
                    <div className="shadow-[rgba(0,0,0,0.5)] shadow-xl overflow-hidden rounded-2xl">
                        <Show show={currentShow}/>
                    </div>
                    <div className="shadow-[rgba(0,0,0,0.5)] shadow-xl overflow-hidden rounded-2xl flex-grow">
                        <ControlsBox song={currentSong} className={'h-full'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ControlsBox ({ song, className }) {
    return ( song &&
        <div className={"controls-container rounded-2xl overflow-hidden " + className}>
            <Image image={song.image_uri} className="rounded-2xl overflow-hidden h-full">
                <div className="info dark-alpha-2 p-4 flex flex-col h-full justify-end backdrop-blur-xs overflow-hidden">
                    <ArtistImage artistName={song.artist} className="flex-grow rounded-2xl bg-top overflow-hidden">
                        <div className="artist text-2xl font-semibold h-full w-full flex items-end p-4 bg-linear-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]">{ song.artist }</div>
                    </ArtistImage>
                    <div className="other-info px-4 py-2">
                        <div className="album text-lg font-semibold">{ song.album }</div>
                        <div className="song  text-lg font-semibold">{  song.song }</div>
                    </div>
                    <div className="buttons-container mt-4">
                        <Controls currentSong={song} className="flex flex-row justify-evenly" />
                    </div>
                </div>
            </Image>
        </div>
    );
}