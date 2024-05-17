import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import { getAllSongsByViewsCount } from '../../api'
import { actionType } from '../../context/reducer'
import SongContainer from './SongContainer'

const MusicsHot = () => {
  const [{allSongs}, dispatch] = useStateValue()
  const [songFilter, setSongFilter] = useState("")
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if(!allSongs) {
      getAllSongsByViewsCount().then((data) => {
          dispatch({
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
    <div>
      <div className='w-full flex items-center justify-center gap-20'>
        <input 
          className={`w-[500px] px-4 py-2 border ${isFocus ? "border-gray-400 shadow-md" : "border-gray-300"} rounded-md outline-none transition-all duration-150 ease-in-out text-base text-textColor font-semibold`}
          type='text' 
          placeholder='Search here....' 
          value={songFilter} 
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
      </div>

      <div className='relative w-full my-4 p-4 py-12 border border-gray-300 rounded-md bg-slate-400'>
        {/* <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-textColor'>
            <span className='text-sm font-semibold'>Count: {" "}</span>
            {allSongs?.length}
          </p>
        </div> */}

        {!songFilter ? <SongContainer data={allSongs} /> : <SongContainer data={searchedSong} />}
      </div>
    </div>
  )
}

export default MusicsHot