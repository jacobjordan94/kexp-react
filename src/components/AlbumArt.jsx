function AlbumArt({ image, className, children }) {
    return ( image ?
        <img src={image} className={className || "w-full h-full object-cover"} />
        :
        children
    );
}

export default AlbumArt;