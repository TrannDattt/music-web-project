import React from 'react'
import { getAlbumById, getUserById } from '../../api'
import Header from './Header'
import { useStateValue } from '../../context/StateProvider'

const AlbumPlayer = (albumId) => {
    const album = getAlbumById(albumId)
    const user = getUserById(album?.userId)

    const [{allSongs, allAlbums, isSongPlaying, songIndex, isAlbumOpening, albumIndex}, dispatch] = useStateValue()

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-slate-500 z-10">
      <div className='relative z-50'>
        <div className='absolute flex items-start top-14 left-5'>
          <img
            src={allAlbums[albumIndex]?.imageURL}
            alt=''
            className=''
          />

          <p className=''>{allAlbums[albumIndex]?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default AlbumPlayer