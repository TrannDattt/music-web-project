import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import { RiPlayListFill } from 'react-icons/ri'
import { IoClose, IoMusicalNote } from 'react-icons/io5'
import { motion } from 'framer-motion'

import 'react-h5-audio-player/lib/styles.css'
import AudioPlayer from 'react-h5-audio-player'
import { actionType } from '../../context/reducer'
import { getAllSongs } from '../../api'
import { MdReport } from 'react-icons/md'
import { report } from '../../utils/supportFuntions'

const MusicPlayer = ({songData}) => {
    const [{isSongPlaying, songIndex}, dispatch] = useStateValue()
    const [isPlaylist, setIsPlaylist] = useState(false)

    const nextTrack = () => {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: songIndex === (songData.length - 1) ? 0 : songIndex + 1,
        })
    }

    const previousTrack = () => {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: songIndex === 0 ? songData.length - 1 : songIndex - 1,
        })
    }

    const closePlayer = () => {
        dispatch({
            type: actionType.SET_IS_SONG_PLAYING,
            isSongPlaying: false,
        })
    }

  return (
    <div className='flex w-full gap-3 items-center overflow-hidden z-50'>
        <div className={`w-full gap-3 p-4 flex items-center relative`}>
            <img 
                src={songData[songIndex]?.imageURL}
                alt=''
                className='w-40 h-24 rounded-md object-cover'
            />

            <div className='flex items-start flex-col'>
                <p className='text-xl text-headingColor font-semibold'>
                    {`${
                        songData[songIndex]?.name.length > 10
                        ? `${songData[songIndex]?.name.slice(0,10)}...`
                        : songData[songIndex]?.name
                    }`}
                </p>

                <p className='text-textColor'>
                    {songData[songIndex]?.albumName && (
                        <span className='text-base'>{`${songData[songIndex]?.albumName} - `}</span>
                    )}{" "}

                    {songData[songIndex]?.artistName}
                    {/* <p className='text-textColor text-sm font-semibold'>
                        ({songData[songIndex]?.category})
                    </p> */}
                </p>

                <motion.i 
                    whileTap={{scale: 0.8}}
                    whileHover={{scale: 1.1}}
                    onClick={() => setIsPlaylist(!isPlaylist)}
                >
                    <RiPlayListFill className='text-textColor hover:text-headingColor text-xl' />
                </motion.i>
            </div>

            <AudioPlayer 
                src={songData[songIndex]?.songURL}
                onPlay={() => console.log("is playing...")}
                autoPlay={true}
                showSkipControls={true}
                onClickNext={() => nextTrack()}
                onClickPrevious={() => previousTrack()}
            />

        </div>

        {isPlaylist && (<PlaylistCard songData={songData} />) }
        
        <div className='h-full flex flex-col p-1 gap-4 text-gray-600'>
            <IoClose className='hover:border-2 text-2xl' onClick={() => closePlayer()} />

            <motion.i 
                whileTap={{scale: 0.8}}
                whileHover={{scale: 1.1}}
                onClick={() => report()}
            >
                <MdReport className='text-textColor hover:text-headingColor text-2xl my-2' />
            </motion.i>
        </div>
    </div>
  )
}

export const PlaylistCard = ({songData}) => {
    const [{isSongPlaying, songIndex}, dispatch] = useStateValue()

    const setCurrentSong = (playlistSongIndex) => {
        if(!isSongPlaying) {
            dispatch({
                type: actionType.SET_IS_SONG_PLAYING,
                isSongPlaying: true,
            })
        }
        if(songIndex != playlistSongIndex) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: playlistSongIndex,
            })
        }
    }

    return (
        <div className='absolute left-4 bottom-24 gap-1 py-1 w-350 max-w-[350px] max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary'>
            {
                songData.length > 0 ? (
                    songData.map((music, index) => (
                        <motion.div
                            initial={{opacity: 0, translateX: -50}}
                            animate={{opacity: 1, translateX: 0}}
                            transition={{duration: 0.3, delay: index * 0.1}}
                            className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'
                            onClick={() => setCurrentSong(index)}
                        >
                            <IoMusicalNote className='text-textColor group-hover:text-headingColor cursor-pointer text-2xl' />

                            <div className='flex items-start flex-col'>
                                <p className='text-lg text-headingColor font-semibold'>
                                    {`${
                                        music?.name.length > 20
                                        ? music?.name.slice(0, 20)
                                        : music?.name
                                    }`}{" "}
                                    {songData[songIndex]?.albumName && (
                                        <span className='text-base'>{` - ${music?.albumName}`}</span>
                                    )}
                                </p>

                                <p className='text-textColor'>
                                    {songData[songIndex]?.artistName}{" "}
                                    {/* <p className='text-textColor text-sm font-semibold'>
                                        ({songData[songIndex]?.category})
                                    </p> */}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : <></>
            }
        </div>
    )
}

export default MusicPlayer