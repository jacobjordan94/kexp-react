import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import useSong from "@/hooks/Song";
import { SongBody } from "@/pages/Song.components";
import useCurrentBackgroundStore from "@/store/useCurrentBackgroundStore";

function Song() {
    const { id } = useParams();
    const [ song ] = useSong(id);
    const setCurrentBackground = useCurrentBackgroundStore(store => store.setCurrentBackground);
    const currentBackground = useCurrentBackgroundStore(store => store.background);

    if (song) {
        const bg = song.image_uri || song.thumbnail_uri;
        if (bg && currentBackground !== bg) {
            setCurrentBackground(bg);
        }
    }

    return (
        song && (
            <>
                <Helmet>
                    <title>KEXP - {song.artist}, {song.song}</title>
                </Helmet>
                <div className="page page-song h-full w-full">
                    <SongBody song={song} />
                </div>
            </>
        )
    );
}

export default Song;
