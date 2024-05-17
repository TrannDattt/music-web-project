import React, { useEffect, useState } from 'react'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../../config/firebase.config'
import { MdDelete } from 'react-icons/md'
import {motion} from 'framer-motion'

import FilterButton from './FilterButton'
import { filterByCate, filterByLang } from "../../utils/supportFuntions"
import { useStateValue } from '../../context/StateProvider'
import { getAllAlbums, getAllArtists, getAllSongs, saveNewSong } from '../../api'
import { actionType } from '../../context/reducer'
import FileLoader from './FileLoader'
import FileUploader from './FileUploader'

const NewSong = () => {
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [imageUploadProgress, setImageUploadProgress] = useState(0)
    const [songImageCover, setSongImageCover] = useState(null)
    const [isAudioUploading, setIsAudioUploading] = useState(false)
    const [audioUploadProgress, setAudioUploadProgress] = useState(0)
    const [audioFile, setAudioFile] = useState(null)
    const [songName, setSongName] = useState("")

    const [{allArtists, allSongs, allAlbums, userFilter, albumFilter, languageFilter, categoryFilter, user, arlertType}
            , dispatch] = useStateValue()

    useEffect(() => {
        if(!allArtists) {
            getAllArtists().then((data) => {
                dispatch ({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.artist
                })
            })
        }

        if(!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch ({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }
    })

    const deleteFileObject = (url, isImage) => {
        const deleteRef = ref(storage, url)

        if(isImage) {
            setIsImageUploading(true)
            deleteObject(deleteRef).then(() => {
                setSongImageCover(null)
                setIsImageUploading(false)
            })
        } else {
            setIsAudioUploading(true)
            deleteObject(deleteRef).then(() => {
                setAudioFile(null)
                setIsAudioUploading(false)
            })
        }

        dispatch({
            type: actionType.SET_ARLERT_TYPE,
            arlertType: "success",
        })
        setInterval(() => {
            dispatch({
                type: actionType.SET_ARLERT_TYPE,
                arlertType: null,
            })
        }, 4000)
    }

    const saveSong = () => {
        const isMissing = (!songImageCover || !audioFile || !songName || !languageFilter || !categoryFilter) ?
            false : true

        if (!isMissing) {
            dispatch({
                type: actionType.SET_ARLERT_TYPE,
                arlertType: "danger",
            })
            setInterval(() => {
                dispatch({
                    type: actionType.SET_ARLERT_TYPE,
                    arlertType: null,
                })
            }, 4000)
        } else {
            setIsImageUploading(true)
            setIsAudioUploading(true)

            const data = {
                name: songName,
                imageURL: songImageCover,
                songURL: audioFile,
                albumId: albumFilter ? albumFilter._id : "",
                albumName: albumFilter ? albumFilter.name : "",
                artistId: user?.user._id,
                artistName: user?.user.name,
                language: languageFilter,
                category: categoryFilter,
            }

            saveNewSong(data).then((res) => {
                getAllSongs().then((songs) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: songs.song,
                    })
                })
            })

            setSongName("")
            setIsAudioUploading(false)
            setIsImageUploading(false)
            setSongImageCover(null)
            setAudioFile(null)
            
            dispatch({type: actionType.SET_ARTITST_FILTER, userFilter: null,})
            dispatch({type: actionType.SET_ALBUM_FILTER, albumFilter: null,})
            dispatch({type: actionType.SET_LANGUAGE_FILTER, languageFilter: null,})
            dispatch({type: actionType.SET_CATEGORY_FILTER, categoryFilter: null,})

            dispatch({
                type: actionType.SET_ARLERT_TYPE,
                arlertType: "success",
            })
            setInterval(() => {
                dispatch({
                    type: actionType.SET_ARLERT_TYPE,
                    arlertType: null,
                })
            }, 4000)
        }
    }

  return (
    <div className='flex flex-row items-start justify-center p-4 border border-r-gray-300 rounded-md gap-4'>
        <div className='flex flex-col w-1/2 gap-4'>
            {/* Image upload */}
            <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                {isImageUploading && <FileLoader progress={imageUploadProgress} />}
                {!isImageUploading && (
                    <>{!songImageCover 
                        ? <FileUploader 
                            updateState={setSongImageCover} 
                            setProgress={setImageUploadProgress} 
                            isLoading={setIsImageUploading}
                            isImage={true}
                        /> 
                        : <div className='relative w-full h-full rounded-md flex justify-center'>
                            <img
                                src={songImageCover}
                                className='object-cover h-full'
                                alt='' 
                            />

                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md hover:bg-red-400 duration-200 transition-all ease-in-out' onClick={() => deleteFileObject(songImageCover, true)}>
                                <MdDelete className='text-white' />
                            </button>
                        </div>
                    }</>
                )}
            </div>

            {/* Audio upload */}
            <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                {isAudioUploading && <FileLoader progress={audioUploadProgress} />}
                {!isAudioUploading && (
                    <>{!audioFile 
                        ? <FileUploader 
                            updateState={setAudioFile} 
                            setProgress={setAudioUploadProgress} 
                            isLoading={setIsAudioUploading}
                            isImage={false}
                        /> 
                        : <div className='relative w-full h-full rounded-md flex justify-center items-center'>
                            <audio
                                src={audioFile}
                                controls
                            />

                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md hover:bg-red-400 duration-200 transition-all ease-in-out' onClick={() => deleteFileObject(audioFile, false)}>
                                <MdDelete className='text-white' />
                            </button>
                        </div>
                    }</>
                )}
            </div> 
        </div>

        <div className='flex flex-col w-1/2 gap-4'>
            <input
                type='text'
                placeholder='Enter song name....'
                className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300'
                value={songName}
                onChange={(e) => setSongName(e.target.value)}   
            />

            <div className='flex w-full items-center justify-evenly gap-4 flex-wrap'>
                <FilterButton filterData={allArtists} flag={"User"} />
                <FilterButton filterData={allAlbums} flag={"Album"} />
                <FilterButton filterData={filterByLang} flag={"Language"} />
                <FilterButton filterData={filterByCate} flag={"Category"} />
            </div>

            {/* Save button */}
            <div className='flex items-center justify-end w-full p-4 cursor-pointer'>
                {(isImageUploading || isAudioUploading ) ? 
                    (<DisableSubmitButton />) : 
                    (
                        <motion.button
                            whileTap={{scale: 0.75}}
                            className='px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg w-48'
                            onClick={saveSong}
                        >
                            Save song
                        </motion.button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export const DisableSubmitButton = () => {
    return (
        <>
            <button
                type="button" className="pointer-events-none inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong" disabled>
                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </button>
        </>
    )
}

export default NewSong