import { useParams } from "react-router";
import useSong from "../hooks/Song";

function Song() {
    const { id } = useParams();
    const [ song ] = useSong(id);

    return (
        song && 
        <div className="page page-song">
            {song.song}
        </div>
    );
}

export default Song;