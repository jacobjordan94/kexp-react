import AlbumArt from "../components/AlbumArt";

export function HomeInformation({ currentSong }) {

    return ( currentSong &&
        <div style={{ '--tw-text-shadow-color': 'gray' }} className="home-information-wrapper inline-flex flex-col w-10/12 text-shadow-lg">
            <div className="album-art-wrapper rounded-2xl overflow-hidden p-4 backdrop-blur-2xl">
                <div className="picture-wrap rounded-2xl overflow-hidden">
                    <AlbumArt className="w-full" image={currentSong.image_uri}></AlbumArt>
                </div>
            </div>
            <div className="information-wrapper px-4">
                <div className="artist text-3xl">{ currentSong.artist }</div>
                <div className="song text-lg">{currentSong.song}</div>
            </div>
        </div>
    );
}