import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {} from 'react-icons/ai'

import { IoAdd } from 'react-icons/io5'
import { useStateValue } from '../../context/StateProvider'
import { getAllSongs } from '../../api'
import { actionType } from '../../context/reducer'
import SongContainer from './SongContainer'

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("")
  const [isFocus, setIsFocus] = useState(false)
  const [{allSongs}, dispatch] = useStateValue()

  useEffect(() => {
    if(!allSongs) {
      getAllSongs().then((data) => {
        // console.log(data)
        dispatch ({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        })
      })
    }
  }, [])

  const searchedSong = songFilter 
  ? allSongs?.filter((data) => 
      data.name.toLowerCase().includes(songFilter.toLowerCase())
    ) 
  : allSongs

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex items-center justify-center gap-20'>
        {/* Add song - move to user premium */}
        <NavLink to={"/dashboard/new-song"} className='flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'>
          <IoAdd /> Add New Song
        </NavLink>

        <input 
          className={`w-96 px-4 py-2 border ${isFocus ? "border-gray-400 shadow-md" : "border-gray-300"} rounded-md outline-none transition-all duration-150 ease-in-out text-base text-textColor font-semibold`}
          type='text' 
          placeholder='Search here....' 
          value={songFilter} 
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
      </div>

      {/* Main container */}
      <div className='relative w-full my-4 p-4 py-12 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-textColor'>
            <span className='text-sm font-semibold'>Count: {" "}</span>
            
            {allSongs?.length}
          </p>
        </div>

        {/* {!songFilter && <SongContainer data={allSongs} />} */}
        {!songFilter ? <SongContainer data={allSongs} /> : <SongContainer data={searchedSong} />}
        
      </div>
    </div>
  )
}

export default DashboardSongs