import useITunes from "../hooks/ITunes";
import useWikiImage from "../hooks/WikiImage";

export function SongBody({ song }) {
    const { artistResponse, songResponse } = useITunes(song.artist, song.song);
    const [ wikiImage ] = useWikiImage(song.artist);

    return ( (artistResponse && songResponse && wikiImage) &&
        <div className="song-body">
            { JSON.stringify(artistResponse) }
            { JSON.stringify(songResponse) }
            { wikiImage }
        </div>
    )
}