import React from 'react'
import ReportsMusic from './ReportsMusic'
import ReportsAlbum from './ReportsAlbum'
import { useStateValue } from '../../context/StateProvider'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './Header'
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles'
import Arlert from './Arlert'

const Reports = () => {
    const [{allUsers, allArtists, allSongs, allAlbums, arlertType}, dispatch] = useStateValue()

    return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-500">
        <Header />
  
        <div className='w-[60%] my-2 p-1 flex items-center justify-evenly'>
          <NavLink to={"/reports/music"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Music
          </NavLink>
  
          <NavLink to={"/reports/album"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>
            Album
          </NavLink>
        </div>
  
        <div className='my-4 w-full p-4'>
          <Routes>
            <Route path='/music' element={<ReportsMusic />} />
            <Route path='/album' element={<ReportsAlbum />} />
          </Routes>
        </div>
  
        {arlertType && (
          <Arlert type={arlertType} />
        )}
      </div>
    )
}

export default Reports