import { useReducer } from "react";

function useLikedSongs() {
    const [ likedSongs, dispatch ] = useReducer(
        function(state, action) {
            switch(action.type) {
                case 'add': {
                    state.unshift(action.song);
                    updateStorage(state);
                    return state;
                }
                case 'remove': {
                    const removeIndex = state.findIndex(song => song.id === action.id);
                    state.splice(removeIndex, 1);
                    updateStorage(state);
                    return state;
                }
                default: return state;
            }
        }, 
        fromLocalStorage()
    );

    return [ likedSongs, dispatch ];
}

function fromLocalStorage() {
    const likes = localStorage.getItem('kexp-likes');
    return likes ? JSON.parse(likes) : [];
}

function updateStorage(likedSongs) {
    localStorage.setItem('kexp-likes', likedSongs);
}

export default useLikedSongs;