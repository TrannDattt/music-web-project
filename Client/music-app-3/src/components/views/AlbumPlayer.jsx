import React, { useEffect, useState } from 'react'
import { getAlbumById, getAllSongs, getSongByAlbumId, getUserById } from '../../api'
import Header from './Header'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdPlaylistAdd, MdPlaylistAddCheck, MdReport } from 'react-icons/md'
import { IoClose, IoEye } from 'react-icons/io5'
import { report } from '../../utils/supportFuntions'

const AlbumPlayer = () => {
    const [{allSongs, allAlbums, isAlbumOpening, albumIndex, musicInAlbum}, dispatch] = useStateValue()
    const [isLiked, setIsLiked] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
      if(!allSongs) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.song,
          })
        })
      }
  
      if(!musicInAlbum) {
        getSongByAlbumId(allAlbums[albumIndex]?._id).then((data) => {
          dispatch({
            type: actionType.SET_MUSIC_IN_ALBUM,
            musicInAlbum: data.song,
          })
        })
      }
    }, [])

    const closeAlbum = () => {
      dispatch({
        type: actionType.SET_IS_ALBUM_OPENING,
        isAlbumOpening: false,
      })

      dispatch({
        type: actionType.SET_MUSIC_IN_ALBUM,
        musicInAlbum: null,
      })
    }

  return (
    <div className="relative">
      <div className="relative w-full h-36 flex flex-col items-center justify-center z-10">
        <div className='absolute flex flex-row left-32 h-20'>
          <img
            src={allAlbums[albumIndex]?.imageURL}
            alt=''
            className='w-[140px] h-[140px] mx-4 shadow-md rounded-md'
          />

          <p className='text-headingColor font-semibold m-4 '>
            <span className='text-3xl py-2'>{allAlbums[albumIndex]?.name}</span>
            <span className='block text-xl py-2 text-gray-500'>{allAlbums[albumIndex]?.artistName}</span>
          </p>
        </div>

        <IoClose
         className='absolute right-6 top-6 text-textColor hover:text-headingColor text-2xl' 
         onClick={closeAlbum}
        />
      </div>

      <div className='h-[340px] mb-4 mx-4 py-8 px-4 bg-slate-400 border-2 border-l-cardOverlay rounded-md overflow-y-scroll overflow-x-hidden scrollbar-thin'>
        {musicInAlbum && (
          musicInAlbum?.map((data, index) => (
            <AlbumMusicCard key={data._id} data={data} index={index} />
          ))
        )}
      </div>
    </div>
  )
}

const AlbumMusicCard = ({data, index}) => {
  const [{isSongPlaying, songIndex}, dispatch] = useStateValue()

  const addToContext = () => {
    if(!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      })
    }

    if(songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      })
    }
  }

  return (
    <motion.div 
      initial={{opacity: 0, translateX: 50}}
      animate={{opacity: 1, translateX: 0}}
      transition={{duration: 0.3, delay: index * 0.1}}
      key={index} 
      onClick={() => addToContext()}
      className='relative w-full rounded-md flex items-center justify-between py-3 my-1 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
    >

      <div className='w-225 min-w-[160px] flex items-center justify-center'>
        <img src={data.imageURL} alt='' className='w-10 h-10 object-cover rounded-md min-w-[40ox] shadow-md' />
      </div>

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.name}</p>
      <p className='text-xs italic text-textColor w-275 min-w-[160px] text-center'>Views: {" "}{data.viewCount}</p>
    </motion.div>
  )
}

export default AlbumPlayer