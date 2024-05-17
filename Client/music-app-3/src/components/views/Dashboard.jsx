import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import { useStateValue } from '../../context/StateProvider'

import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardArtists from './DashboardArtists'
import DashboardSongs from './DashboardSongs'
import DashboardAlbums from './DashboardAlbums'
import NewSong from './NewSong'
import NewArtist from './NewArtist'
import Arlert from './Arlert'
import NewAlbum from './NewAlbum'

// import {DashboardHome} from './DashboardHome'

const Dashboard = () => {
  const [{allUsers, allArtists, allSongs, allAlbums, arlertType}, dispatch] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-500">
      <Header />

      <div className='w-[60%] my-2 p-1 flex items-center justify-evenly'>
        <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Home
        </NavLink>

        <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Users
        </NavLink>

        {/* <NavLink to={"/dashboard/artists"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Artists
        </NavLink> */}

        <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Songs
        </NavLink>

        <NavLink to={"/dashboard/albums"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Albums
        </NavLink>
      </div>

      <div className='my-4 w-full p-4'>
        <Routes>
          <Route path='/home' element={<DashboardHome />} />
          <Route path='/users' element={<DashboardUsers />} />
          {/* <Route path='/artists' element={<DashboardArtists />} /> */}
          <Route path='/songs' element={<DashboardSongs />} />
          <Route path='/albums' element={<DashboardAlbums />} />
          <Route path='/new-song' element={<NewSong />} />
          {/* <Route path='/new-artist' element={<NewArtist />} /> */}
          <Route path='/new-album' element={<NewAlbum />} />
        </Routes>
      </div>

      {arlertType && (
        <Arlert type={arlertType} />
      )}
    </div>
  )
}

export default Dashboard