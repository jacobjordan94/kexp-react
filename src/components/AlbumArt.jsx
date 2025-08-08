function AlbumArt({ image, className }) {
    const defaultImage = 'https://www.kexp.org/media/filer_public/d8/42/d8422d8d-91b0-4fa4-bd8e-fbb64af4b147/live_on_kexp_mic_500x500_-_nataworry_photography.jpg';
    return <img src={ image !== '' ? image : defaultImage } className={className || "w-full h-full object-cover"} />;
}

export default AlbumArt;