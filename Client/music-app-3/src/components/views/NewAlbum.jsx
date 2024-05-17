import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import { MdDelete } from 'react-icons/md'
import FileLoader from './FileLoader'
import { deleteObject, ref } from 'firebase/storage'
import { useStateValue } from '../../context/StateProvider'
import { DisableSubmitButton } from './NewSong'
import { motion } from 'framer-motion' 
import { actionType } from '../../context/reducer'
import { getAllAlbums, getAllUsers, saveNewAlbum } from '../../api'
import { storage } from '../../config/firebase.config'
import { filterByLang } from '../../utils/supportFuntions'
import FilterButton from './FilterButton'

const NewAlbum = () => {
    const [albumImageCover, setAlbumImageCover] = useState(null)
    const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0)
    const [isAlbumUploading, setIsAlbumUploading] = useState(false)
    const [albumName, setAlbumName] = useState("")

    const [{user, allUsers, allAlbums, userFilter, languageFilter}, dispatch] = useStateValue()

    useEffect(() => {
        if(!allUsers) {
            getAllUsers().then((data) => {
                dispatch ({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                })
            })
        }
    }, [])

    const deleteFileObject = (url) => {
        const deleteRef = ref(storage, url)

        setIsAlbumUploading(true)
        deleteObject(deleteRef).then(() => {
            setAlbumImageCover(null)
            setIsAlbumUploading(false)
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
        }, 4000)
    }

    const saveAlbum = () => {
        const isMissing = (!albumImageCover  || !albumName || (user?.user.role === "admin" && !userFilter) || !languageFilter) ? false : true

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
            setIsAlbumUploading(true)

            const dataIfAdmin = {
                name: albumName,
                imageURL: albumImageCover,
                artistId: userFilter._id,
                artistName: userFilter.name,
                language: languageFilter,
            }

            const dataIfMember = {
                name: albumName,
                imageURL: albumImageCover,
                artistId: user?.user._id,
                artistName: user?.user.name,
                language: languageFilter,
            }

            saveNewAlbum(user?.user?.role === "admin" ? dataIfAdmin : dataIfMember).then((res) => {
                getAllAlbums().then((albums) => {
                    dispatch({
                        type: actionType.SET_ALL_ALBUMS,
                        allAlbums: albums.album,
                    })
                })
            })

            setAlbumName("")
            setIsAlbumUploading(false)
            setAlbumImageCover(null)

            dispatch({type: actionType.SET_ARTITST_FILTER, userFilter: null,})
            dispatch({type: actionType.SET_LANGUAGE_FILTER, languageFilter: null,})

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
                {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
                {!isAlbumUploading && (
                    <>{!albumImageCover 
                        ? <FileUploader 
                            updateState={setAlbumImageCover} 
                            setProgress={setAlbumUploadingProgress} 
                            isLoading={setIsAlbumUploading}
                            isImage={true}
                        /> 
                        : <div className='relative w-full h-full rounded-md flex justify-center'>
                            <img
                                src={albumImageCover}
                                className='object-cover h-full'
                                alt='' 
                            />

                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md hover:bg-red-400 duration-200 transition-all ease-in-out' onClick={() => deleteFileObject(albumImageCover)}>
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
                placeholder='Enter album name....'
                className='w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border-gray-300'
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}   
            />

            <div className='flex w-full items-center justify-evenly gap-4 flex-wrap'>
                {user?.user?.role === "admin" && (
                    <FilterButton filterData={allUsers} flag={"User"} />
                )}
                
                <FilterButton filterData={filterByLang} flag={"Language"} />
            </div>

            {/* Add songs */}
            <div>

            </div>

            {/* Save button */}
            <div className='flex items-center justify-end w-full p-4 cursor-pointer'>
                {isAlbumUploading ? 
                    (<DisableSubmitButton />) : 
                    (
                        <motion.button
                            whileTap={{scale: 0.75}}
                            className='px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg w-48'
                            onClick={saveAlbum}
                        >
                            Save album
                        </motion.button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default NewAlbum