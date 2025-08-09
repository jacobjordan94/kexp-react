import AlbumArt from "./AlbumArt";

function PictureWithInfo({ image, title, subtitle, children }) {
    return (
        <div className="picture-with-info flex">
            <div className="image size-12 rounded-md overflow-hidden">
                <AlbumArt image={image} />
            </div>
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
