function AlbumArt({ image, className }) {
    return ( image &&
        <img src={image} className={className || "w-full h-full object-cover"} />
    );
}

export default AlbumArt;