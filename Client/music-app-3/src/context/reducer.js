export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",

    // Filters
    SET_USER_FILTER: "SET_USER_FILTER",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_CATEGORY_FILTER: "SET_CATEGORY_FILTER",

    // Arlert
    SET_ARLERT_TYPE: "SET_ARLERT_TYPE",

    // Play song
    SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
    SET_SONG_INDEX: "SET_SONG_INDEX",

    // Open album
    SET_IS_ALBUM_OPENING: "SET_IS_ALBUM_OPENING",
    SET_ALBUM_INDEX: "SET_ALBUM_INDEX",
}

const reducer = (state, action) => {
    switch(action.type) {
        case actionType.SET_USER:
            return{
                ...state,
                user : action.user,
            }

        case actionType.SET_ALL_USERS:
            return{
                ...state,
                allUsers : action.allUsers,
            }

        case actionType.SET_ALL_ARTISTS:
            return{
                ...state,
                allArtists : action.allArtists,
            }

        case actionType.SET_ALL_SONGS:
            return{
                ...state,
                allSongs : action.allSongs,
            }

        case actionType.SET_ALL_ALBUMS:
            return{
                ...state,
                allAlbums : action.allAlbums,
            }

        // Filter cases
        case actionType.SET_USER_FILTER:
            return{
                ...state,
                userFilter: action.userFilter,
            }
            
        case actionType.SET_ALBUM_FILTER:
            return{
                ...state,
                albumFilter: action.albumFilter,
            }
            
        case actionType.SET_LANGUAGE_FILTER:
            return{
                ...state,
                languageFilter: action.languageFilter,
            }
            
        case actionType.SET_CATEGORY_FILTER:
            return{
                ...state,
                categoryFilter: action.categoryFilter,
            }

        case actionType.SET_ARLERT_TYPE:
        return{
            ...state,
            arlertType: action.arlertType,
        }

        case actionType.SET_IS_SONG_PLAYING:
        return{
            ...state,
            isSongPlaying: action.isSongPlaying,
        }

        case actionType.SET_SONG_INDEX:
        return{
            ...state,
            songIndex: action.songIndex,
        }

        case actionType.SET_IS_ALBUM_OPENING:
        return{
            ...state,
            isAlbumOpening: action.isAlbumOpening,
        }

        case actionType.SET_ALBUM_INDEX:
        return{
            ...state,
            albumIndex: action.albumIndex,
        }

        default:
            return state
    }
}

export default reducer