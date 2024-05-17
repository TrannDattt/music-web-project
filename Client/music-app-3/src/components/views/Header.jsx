import React from 'react'
import { Logo } from '../../assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import {FaCrown} from 'react-icons/fa'

import { useStateValue } from '../../context/StateProvider'
import { browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth'
import { app } from '../../config/firebase.config'

import { motion } from 'framer-motion'
import { useState } from 'react'

import {IoHome, IoMusicalNotes, IoChatbubble, IoAlbums} from 'react-icons/io5'
import { actionType } from '../../context/reducer'

const Header = () => {
    const [{user, isSongPlaying}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const navigate = useNavigate()

    const logOut = () => {
        dispatch({
            type: actionType.SET_IS_SONG_PLAYING,
            isSongPlaying: false,
        })

        const firebaseAuth = getAuth(app)
        setPersistence(firebaseAuth, browserLocalPersistence).then(() => {
            firebaseAuth.signOut().then(() => {
                window.localStorage.setItem("auth", "false")
            }).catch((error) => console.log(error))
            navigate('/login', {replace : true})
        })
    }

  return (
    <header className='flex items-center w-full p-4  md:py-0 md:px-6 bg-slate-950'>
        <NavLink to={"/"} >
            <img src={Logo} alt='Logo' className='w-16' />
        </NavLink>

        <ul className='flex items-center justify-center ml-7'>
            <li className='text-lg text-white hover:bg-slate-500'><NavLink to={"/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
                <a className='mx-5 flex flex-row items-center h-20'><IoHome className='text-2xl' /> Home</a>
            </NavLink></li>

            <li className='text-lg text-white hover:bg-slate-500'><NavLink to={"/musics/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
                <a className='mx-5 flex flex-row items-center h-20'><IoMusicalNotes className='text-2xl' /> Musics</a>
            </NavLink></li>

            <li className='text-lg text-white hover:bg-slate-500'><NavLink to={"/albums/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
                <a className='mx-5 flex flex-row items-center h-20'><IoAlbums className='text-2xl' /> Albums</a>
            </NavLink></li>

            <li className='text-lg text-white hover:bg-slate-500'><NavLink to={"/premium"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
                <a className='mx-5 flex flex-row items-center h-20'><FaCrown className='text-2xl' /> Premium</a>
            </NavLink></li>

            <li className='text-lg text-white hover:bg-slate-500'><NavLink to={"/contact-us"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
                <a className='mx-5 flex flex-row items-center h-20'><IoChatbubble className='text-2xl' /> Contact Us</a>
            </NavLink></li>
        </ul>

        <div
            onClick={() => !isMenu ? setIsMenu(true) : setIsMenu(false)}
        className='flex items-center ml-auto gap-2 cursor-pointer relative text-white'>
            <img src={user?.user.imageURL} className='w-12 min-w-[44px] h-12 border-white border-solid border-2 object-cover rounded-full shadow-lg' alt='avatar' referrerPolicy='no-referrer' />
            <div className='flex flex-col'>
                <p className='text-lg hover:text-gray-400 font-semibold'>
                    {user?.user?.name.length > 10 ? `${user?.user?.name.slice(0,10)}....` : user?.user?.name}
                </p>
                {user?.user.premium && <p className='flex items-center gap-2 text-xs font-normal'>Premium Member <FaCrown className='text-sm -ml-1 text-yellow-500' /></p>}
            </div>
        </div>

        {isMenu && (
            <motion.div 
            initial={{opacity : 0, y : 50}} 
            animate={{opacity : 1, y : 5}} 
            exit={{opacity : 0, y : 50}}
            className='absolute z-10 flex flex-col p-3 top-16 right-0 w-52 gap-1 bg-card shadow-lg rounded-lg backdrop-blur-sm'>
                <NavLink to={'/profile'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
                </NavLink>
                <NavLink to={'/favourites'}>
                    <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My Favourites</p>
                </NavLink>
    
                <hr />

                {
                    user?.user?.role === "admin" && (
                        <>
                            <NavLink to={'/dashboard/home'}>
                                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Dashboard</p>
                            </NavLink>

                            <hr />
                        </>
                    )
                }
                
                <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out cursor-pointer' onClick={logOut}>Log Out</p>
            </motion.div>
        )}
    </header>
  )
}

export default Header