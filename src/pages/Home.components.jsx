import { MusicalNoteIcon, UserIcon } from "@heroicons/react/16/solid";
import AlbumArt from "../components/AlbumArt";

export function HomeInformation({ currentSong }) {

    return ( currentSong &&
        <div style={{ '--tw-text-shadow-color': 'gray' }} className="home-information-wrapper inline-flex flex-col w-10/12 text-shadow-sm rounded-2xl backdrop-blur-2xl p-4 gap-4">
            <div className="album-art-wrapper overflow-hidden">
                <div className="picture-wrap rounded-2xl overflow-hidden">
                    <AlbumArt className="w-full" image={currentSong.image_uri}></AlbumArt>
                </div>
            </div>
            <SongInformation currentSong={currentSong} />
        </div>
    );
}

const SongInformation = ({ currentSong }) => 
    <div className="information-wrapper">
        <div className="artist text-2xl flex flex-row items-center">
            <div className="icon size-10 flex items-center justify-center me-2">
                <UserIcon className="size-8" />
            </div>
            { currentSong.artist || 'KEXP' }
        </div>
        <div className="song text-lg flex flex-row items-center mt-0.5">
            <div className="icon w-10 flex justify-center me-2">
                <MusicalNoteIcon className="size-4" />
            </div>
            { currentSong.song || 'Airbreak' }
        </div>
    </div>