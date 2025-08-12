import { Image } from "./AlbumArt";

function PictureWithInfo({ image, title, subtitle, children }) {
    return (
        <div className="picture-with-info flex">
            <Image className="size-12 rounded-md overflow-hidden flex items-center justify-center" image={image} />
            <div className="title-information flex-grow ps-4 font-semibold">
                <div className="title">
                    { title }
                </div>
                <div className="subtitle text-xs">
                    { subtitle }
                </div>
            </div>
            { children }
        </div>
    );
}

export default PictureWithInfo;
