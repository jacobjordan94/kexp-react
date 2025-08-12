import { useEffect, useState } from "react";
import { loadImage } from "../functions/LoadImage";
import Spinner from "./Spinner";

function AlbumArt({image, className = ''}) {
    return <Image image={image} className={className} />
}

export function Image({ 
    image, 
    className = '', 
    fallback = 'https://www.kexp.org/media/filer_public/d8/42/d8422d8d-91b0-4fa4-bd8e-fbb64af4b147/live_on_kexp_mic_500x500_-_nataworry_photography.jpg', 
    children = <></>
}) {
    const [ src, setSrc ] = useState('');
    const [ loading, setLoading ] = useState(true);

    async function setImage() {
        setLoading(true);
        let imageToUse;
        try {
            imageToUse = await loadImage(image);
        } catch {
            imageToUse = await loadImage(fallback);
        }
        setSrc(imageToUse);
        setLoading(false);
    }

    useEffect(() => {
        setImage();
    }, [ image ])

    return (
        <div 
            style={{ backgroundImage: src ? `url(${src})` : '' }} 
            className={"bg-center bg-no-repeat bg-cover " + className}
        >
            { !loading ? children : <Spinner /> }
        </div>

    );
}

export default AlbumArt;