import React, { useEffect } from "react";
import Header from "./Header";
import { HomeBg } from "../../assets";
import { useStateValue } from "../../context/StateProvider";
import { getAllAlbums, getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";

const Home = () => {
    const [{allSongs, allAlbums}, dispatch] = useStateValue()

    useEffect(() => {
        if(!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                })
            })
        }

        if(!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album,
                })
            })
        }
    }, [])

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
            <Header />

            <video src={HomeBg}
                type = "video/mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
            />
        </div>
    )
}

export default Home