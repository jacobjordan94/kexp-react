import { useParams } from "react-router";
import useSong from "../hooks/Song";
import { Image } from '../components/AlbumArt';
import useITunes from "../hooks/ITunes";
import { SongBody } from "./Song.components";

function Song() {
    const { id } = useParams();
    const [ song ] = useSong(id);

    return (
        song && 
        <div className="page page-song relative w-full h-full">
            <SongBody song={song} />
            <Image image={song.image_uri} className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1] blur-sm"></Image>
        </div>
    );
}

export default Song;