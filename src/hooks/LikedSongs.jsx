import { useReducer } from "react";

function useLikedSongs() {
    const [ likedSongs, dispatch ] = useReducer(
        function(state, action) {
            const local = [ ...state ];
            switch(action.type) {
                case 'add': {
                    if(local.findIndex(song => song.id == action.song.id) > -1) return local;
                    local.unshift(action.song);
                    updateStorage(local);
                    return [...local];
                };
                case 'remove': {
                    const removeIndex = local.findIndex(song => song.id === action.id);
                    local.splice(removeIndex, 1);
                    updateStorage(local);
                    return local;
                };
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
    localStorage.setItem('kexp-likes', JSON.stringify(likedSongs));
}

export default useLikedSongs;