import React, { useEffect, useState } from "react";
import {Route, Routes, useNavigate} from "react-router-dom"
import { Login, Home, Dashboard, MusicPlayer, Musics, ContactUs, Premium, NotFound, Albums, AlbumPlayer } from "./components/js"
import { app } from "./config/firebase.config"
import { getAuth } from "firebase/auth";

import {AnimatePresence, motion} from "framer-motion"
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
    const firebaseAuth = getAuth(app)
    const navigate = useNavigate()

    const [{user, allSongs, isSongPlaying, isAlbumOpening, musicInAlbum}, dispatch] = useStateValue()

    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred) {
                userCred.getIdToken().then((token) => {
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data
                        })
                    })
                })
            } else {
                setAuth(false)
                window.localStorage.setItem("auth", "false")
                dispatch({
                    type: actionType.SET_USER,
                    user: null
                })
                navigate("/login")
            }
        })
    }, [])

    return (
        <AnimatePresence mode="wait">
            <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center relative">
                <Routes>
                    <Route path= '/login' element= {<Login setAuth = {setAuth} />} />

                    <Route path= '/*' element= {<Home />} />
                    <Route path="/musics/*" element={<Musics />} />
                    <Route path="/albums/*" element={<Albums />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/contact-us" element={<ContactUs />} />

                    <Route path="/dashboard/*" element= {<Dashboard />} />

                    {/* <Route path="/*" element= {<NotFound />} /> */}
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                    // exit={{opacity: 0, y: 50}}
                    className={`fixed min-w-[700px] h-28 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
                    >
                        <MusicPlayer />
                        {/* <MusicPlayer songData={musicInAlbum ? musicInAlbum : allSongs} /> */}
                    </motion.div>
                )}

                {isAlbumOpening && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                    // exit={{opacity: 0, y: 50}}
                    className={`fixed min-w-[700px] h-fit inset-x-80 inset-y-32 bg-cardOverlay rounded-md drop-shadow-2xl backdrop-blur-md`}
                    >
                        <AlbumPlayer />
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    )
}

export default App