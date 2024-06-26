import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { IoEye, IoTrash } from 'react-icons/io5'
import { deleteAlbumById, deleteSongById, getAllAlbums, getAllSongs } from '../../api'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../../config/firebase.config'
import { MdPlaylistAdd, MdPlaylistAddCheck, MdReport } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const SongCard = ({data, index, type}) => {
  const [isDelete, setIsDelete] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [{user, arlertType, allSongs, allAlbums, isSongPlaying, songIndex, isAlbumOpening, albumIndex}, dispatch] = useStateValue()

  const deleteData = (data) => {
    if (type === "song") {
      const deleteImageRef = ref(storage, data.imageURL)
      const deleteAudioRef = ref(storage, data.songURL)

      deleteObject(deleteImageRef).then(() => {})
      deleteObject(deleteAudioRef).then(() => {})
  
      deleteSongById(data._id).then((res) => {
        if(res.data) {
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.song,
            })
          })

          dispatch({
            type: actionType.SET_ARLERT_TYPE,
            arlertType: "success",
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ARLERT_TYPE,
              arlertType: null,
            })
          }, 3000);
        } else {
          dispatch({
            type: actionType.SET_ARLERT_TYPE,
            arlertType: "danger",
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ARLERT_TYPE,
              arlertType: null,
            })
          }, 3000);
        }
      })
    }

    if(type === "album") {
      const deleteImageRef = ref(storage, data.imageURL)

      deleteObject(deleteImageRef).then(() => {})
  
      deleteAlbumById(data._id).then((res) => {
        if(res.data) {
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            })
          })

          dispatch({
            type: actionType.SET_ARLERT_TYPE,
            arlertType: "success",
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ARLERT_TYPE,
              arlertType: null,
            })
          }, 3000);
        } else {
          dispatch({
            type: actionType.SET_ARLERT_TYPE,
            arlertType: "danger",
          })
          setInterval(() => {
            dispatch({
              type: actionType.SET_ARLERT_TYPE,
              arlertType: null,
            })
          }, 3000);
        }
      })
    }
  }

  const addToContext = () => {
    switch (type) {
      case "song":
        if(isAlbumOpening) {
          dispatch({
            type: actionType.SET_IS_ALBUM_OPENING,
            isAlbumOpening: false,
          })
        }

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

        break;

      case "album":
        if(isSongPlaying) {
          dispatch({
            type: actionType.SET_IS_SONG_PLAYING,
            isSongPlaying: false,
          })
        }

        if(!isAlbumOpening) {
          dispatch({
            type: actionType.SET_IS_ALBUM_OPENING,
            isAlbumOpening: true,
          })
        }

        if(albumIndex !== index) {
          dispatch({
            type: actionType.SET_ALBUM_INDEX,
            albumIndex: index,
          })
        }  

        break;
    
      default:
        break;
    }
  }

  const report = () => {

  }

  return (
    <motion.div 
      initial={{opacity: 0, translateY: 50}}
      animate={{opacity: 1, translateY: 0}}
      transition={{duration: 0.3, delay: index * 0.1}}
      className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    >
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden' onClick={addToContext}>
          <motion.img
          whileHover={{scale: 1.05}}
              src={data.imageURL}
              className='w-full h-full rounded-lg object-cover'
          />
      </div>
      
      {/* Link to artist personal info page */}
      
      <p className='text-base text-headingColor font-semibold my-2 w-full px-4'>
        <span className='hover:underline' onClick={addToContext}>{data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}</span>

        <span className='block text-sm text-gray-400 my-1'>
          {(type === "song" && data.albumName) && (
            <><NavLink to={"/not-found"} className={`hover:underline`}>
              {data.albumName.length > 25 ? `${data.albumName.slice(0, 25)}...` : `${data.albumName}`}
            </NavLink>{" - "}</>
          )}
          
          {data.artistName && (
            <NavLink to={"/not-found"} className={`hover:underline text-sm`}>
              {data.artistName.length > 25 ? `${data.artistName.slice(0, 25)}...` : data.artistName}
            </NavLink>
          )}
        </span>
      </p>

      {/* Add funtion to the buttons */}
      {(user?.user?.role === "member" && (type === "song" || "album")) && (
        <div className='absolute bottom-2 gap-2 right-2 flex items-center justify-between'>
          <i
          className='flex flex-row px-2'
          >
            <IoEye className='text-textColor text-xl' />

            <span className='text-xs text-headingColor font-semibold italic px-1'>{` ${data.viewCount} views`}</span>
          </i>

          <motion.i 
          whileTap={{scale: 0.8}}
          whileHover={{scale: 1.1}}
          onClick={() => {
            setIsLiked(!isLiked)
            isLiked ? data.likeCount-- : data.likeCount++
          }}
          className='flex flex-row px-2'
          >
            {isLiked ? <FaHeart className='text-textColor hover:text-headingColor text-xl' /> : <FaRegHeart className='text-textColor hover:text-headingColor text-xl' />}

            <span className='text-xs text-headingColor font-semibold italic px-1'>{` ${data.likeCount} likes`}</span>
          </motion.i>

          <motion.i 
              whileTap={{scale: 0.8}}
              whileHover={{scale: 1.1}}
          >
            <MdReport className='text-textColor hover:text-headingColor text-xl' onClick={report} />
          </motion.i>
        </div>
      )}

      {user?.user?.role === "admin" && (
        <div className='absolute bottom-2 right-2 flex items-center justify-between'>
          <motion.i 
            whileTap={{scale: 0.8}}
            className='text-xl drop-shadow-md text-red-400 hover:text-red-600'
            onClick={() => setIsDelete(true)}
          >
            <IoTrash />
          </motion.i>
        </div>
      )}

      {isDelete && (
        <motion.div 
          className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center gap-0'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          <p className='text-lg text-headingColor text-center font-semibold'>You really sure you want to <span className='text-red-500'>Delete</span>?</p>
          <div className='flex items-center gap-4'>
            <motion.button 
              className='px-2 py-1 text-sm uppercase bg-red-500 hover:bg-red-600 cursor-pointer rounded-md font-semibold'
              whileTap={{scale: 0.8}}
              onClick={() => deleteData(data)}
            >Yes</motion.button>

            <motion.button 
              className='px-2 py-1 text-sm uppercase bg-white hover:bg-gray-300 cursor-pointer rounded-md font-semibold'
              whileTap={{scale: 0.8}}
              onClick={() => setIsDelete(false)}
            >No</motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SongCard