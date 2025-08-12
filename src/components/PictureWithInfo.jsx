import { Image } from "./AlbumArt";

function PictureWithInfo({ image, title, subtitle, children, imageSize = 'size-12', titleClass = '', subtitleClass = 'text-xs' }) {
    return (
        <div className="picture-with-info flex">
            <Image className={`rounded-md overflow-hidden flex items-center justify-center ${imageSize}`} image={image} />
            <div className="title-information flex-grow font-semibold flex flex-col justify-center px-4">
                <div className={`title ${titleClass}`}>
                    { title }
                </div>
                <div className={`subtitle ${subtitleClass}`}>
                    { subtitle }
                </div>
            </div>
            { children }
        </div>
    );
}

export default PictureWithInfo;
