import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import AlbumsHome from './AlbumsHome'
import AlbumsHot from './AlbumsHot'
import AlbumsNewRelease from './AlbumsNewRelease'

const Albums = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-500">
        <Header />

        <div className='w-[60%] my-2 p-1 flex items-center justify-evenly'>
        <NavLink to={"/albums/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Home
        </NavLink>

        <NavLink to={"/albums/hot"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Hot
        </NavLink>

        <NavLink to={"/albums/new-release"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          New Released
        </NavLink>

        {/* <NavLink to={"/musics/songs"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Songs
        </NavLink>
        
        <NavLink to={"/musics/albums"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
          Albums
        </NavLink> */}
      </div>

      <div className='my-4 w-full p-4'>
        <Routes>
          <Route path='/home' element={<AlbumsHome />} />
          <Route path='/hot' element={<AlbumsHot />} />
          <Route path='/new-release' element={<AlbumsNewRelease />} />
          {/* <Route path='/songs' element={<DashboardSongs />} />
          <Route path='/albums' element={<DashboardAlbums />} />
          <Route path='/new-song' element={<NewSong />} />
          <Route path='/new-artist' element={<NewArtist />} />
          <Route path='/new-album' element={<newAlbum />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default Albums