import useLikedSongsStore from "@/store/useLikedSongsStore";

export default function useIsLiked(song) {
    const likedSongs = useLikedSongsStore(store => store.songs);
    if(!song) return false;
    return likedSongs.some(likedSong => likedSong.id === song?.id);
}