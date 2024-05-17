import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider'
import { getAllAlbums } from '../../api'
import { actionType } from '../../context/reducer'
import SongCard from './SongCard'

const DashboardAlbums = () => {
  const [albumFilter, setAlbumFilter] = useState("")
  const [isFocus, setIsFocus] = useState(false)
  const [{allAlbums}, dispatch] = useStateValue()

  useEffect(() => {
    if(!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        })
      })
    }
  }, [])
  
  const searchedAlbum = albumFilter 
    ? allAlbums?.filter((data) => 
      data.name.toLowerCase().includes(albumFilter.toLowerCase())
    ) 
    : allAlbums

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex items-center justify-center gap-20'>
        {/* ?????? */}
        <NavLink to={"/dashboard/new-album"} className='flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'>
          <IoAdd /> Add New Album
        </NavLink>

        <input 
          className={`w-96 px-4 py-2 border ${isFocus ? "border-gray-400 shadow-md" : "border-gray-300"} rounded-md outline-none transition-all duration-150 ease-in-out text-base text-textColor font-semibold`}
          type='text' 
          placeholder='Search here....' 
          value={albumFilter} 
          onChange={(e) => setAlbumFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
      </div>

      <div className='relative w-full my-4 p-4 py-12 border border-gray-300 rounded-md'>
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold text-textColor'>
            <span className='text-sm font-semibold'>Count: {" "}</span>
            {allAlbums?.length}
          </p>
        </div>

        {!albumFilter ? <AlbumContainer data={allAlbums} /> : <AlbumContainer data={searchedAlbum} />}
        
      </div>
    </div>
  )
}

export const AlbumContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-center'>
      {data && data.map((album, index) => (
        <SongCard key={album._id} data={album} index={index} type="album" />
      ))}
    </div>
  )
}

// export const AlbumPlayer = ({data}) => {
//   const songFromAlbum = () => {
//     if(data) {
//       data.filter((item) => {
//         item.albumName.includes()
//       })
//     }
//   }

//   return (

//   )
// }

export default DashboardAlbums