function AlbumArt({ image }) {
    return ( image &&
        <img src={image} className="w-full h-full object-cover" />
    );
}

export default AlbumArt;