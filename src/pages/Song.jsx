import { useParams } from "react-router";
import useSong from "../hooks/Song";
import { Image } from '../components/AlbumArt';
import useITunes from "../hooks/ITunes";
import { SongBody } from "./Song.components";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../main";
import { Helmet } from "react-helmet";

function Song() {
    const { id } = useParams();
    const [ song ] = useSong(id);

    const { globalState: { background: { setCurrentBackground } } } = useContext(GlobalContext);
    useEffect(() => {
        if(!song) return;
        setCurrentBackground(song.image_uri || song.thumbnail_uri);
    }, [ song ])

    return (
        song &&
        <>
            <Helmet>
                <title>KEXP - {song.artist}, {song.song}</title>
            </Helmet>
            <div className="page page-song h-full w-full">
                <SongBody song={song} />
            </div>
        </>
    );
}

export default Song;