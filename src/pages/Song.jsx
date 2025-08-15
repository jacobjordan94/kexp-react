import { useParams } from "react-router";
import useSong from "../hooks/Song";
import { Image } from '../components/AlbumArt';
import useITunes from "../hooks/ITunes";
import { SongBody } from "./Song.components";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../main";

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
        <div className="page page-song relative w-full h-full">
            <SongBody song={song} />
        </div>
    );
}

export default Song;