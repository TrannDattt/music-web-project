import React, { useEffect } from "react";

import { app } from "../../config/firebase.config";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../context/StateProvider";
import { validateUser } from "../../api";
import { actionType } from "../../context/reducer";
import { LoginBg } from "../../assets";



const Login = ({setAuth}) => {
    const firebaseAuth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const navigate = useNavigate()

    const [{user}, dispatch] = useStateValue()

    // Sign up with email and pass

    // Sign in with email and pass

    // Sign in with Facebook
    const loginWithFacebook = async () => {
        // await signInWithPopup(firebaseAuth, facebookProvider).then((userCred) => {
        //     if(userCred) {
        //         setAuth(true)
        //         window.localStorage.setItem("auth", "true")

        //         firebaseAuth.onAuthStateChanged((userCred) => {
        //             if(userCred) {
        //                 userCred.getIdToken().then((token) => {
        //                     // console.log(token)
        //                     validateUser(token).then((data) => {
        //                         dispatch({
        //                             type: actionType.SET_USER,
        //                             user: data
        //                         })
        //                     })
        //                 })
        //                 navigate("/", {replace : true})
        //             } else {
        //                 setAuth(false)
        //                 dispatch({
        //                     type: actionType.SET_USER,
        //                     user: null
        //                 })
        //                 navigate("/login")
        //             }
        //         })
        //     }
        // })

        // try {
        //     const userCred = await signInWithPopup(firebaseAuth, facebookProvider);
        //     if (userCred) {
        //         setAuth(true);
        //         window.localStorage.setItem("auth", "true");
    
        //         firebaseAuth.onAuthStateChanged(async (user) => {
        //             if (user) {
        //                 const token = await user.getIdToken();
        //                 // console.log(token);
        //                 const data = await validateUser(token);
        //                 dispatch({
        //                     type: actionType.SET_USER,
        //                     user: data
        //                 });
        //                 navigate("/", { replace: true });
        //             } else {
        //                 setAuth(false);
        //                 dispatch({
        //                     type: actionType.SET_USER,
        //                     user: null
        //                 });
        //                 navigate("/login");
        //             }
        //         });
        //     }
        // } catch (error) {
        //     // Handle error when signing in with Facebook
        //     console.error("Error signing in with Facebook:", error);
        // }
    }

    // Sign in with Google
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
            if(userCred) {
                setAuth(true)
                window.localStorage.setItem("auth", "true")

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if(userCred) {
                        userCred.getIdToken().then((token) => {
                            // console.log(token)
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data
                                })
                            })
                        })
                        navigate("/home", {replace : true})
                    } else {
                        setAuth(false)
                        dispatch({
                            type: actionType.SET_USER,
                            user: null
                        })
                        navigate("/login")
                    }
                })
            }
        })
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true") {
            navigate("/home", {replace : true})
        }
    }, [])

    return (
        <div className="relative w-screen h-screen">
            <video src={LoginBg}
                type = "video/mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
                <div>
                    {/* Sign in with email and pass */}
                </div>

                <div className="w-full md:w-375 gap-2 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
                    {/* <div className="w-225 flex items-center justify-start gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all" onClick={loginWithFacebook}>
                        <FaFacebook className="text-xl" />
                        Sign in with Facebook
                    </div> */}

                    <div className="w-225 flex items-center justify-start gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all" onClick={loginWithGoogle}>
                        <FaGoogle className="text-xl" />
                        Sign in with Google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login