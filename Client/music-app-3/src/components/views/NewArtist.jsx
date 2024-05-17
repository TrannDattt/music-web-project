import React, { useState } from 'react'
import FileUploader from './FileUploader'
import { MdDelete } from 'react-icons/md'
import FileLoader from './FileLoader'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../../config/firebase.config'

const NewArtist = () => {
    const [artistImageCover, setArtistImageCover] = useState(null)
    const [artistUploadProgress, setArtistUploadProgress] = useState(0)
    const [isArtistUploading, setIsArtistUploading] = useState(false)
    const [artistName, setArtistName] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    const deleteFileObject = (url) => {
        const deleteRef = ref(storage, url)

        setIsArtistUploading(true)
        deleteObject(deleteRef).then(() => {
            setArtistImageCover(null)
            setIsArtistUploading(false)
        })
    }

  return (
    <div className='flex flex-row items-start justify-center p-4 border border-r-gray-300 rounded-md gap-4'>
        <div className='flex flex-col w-1/2 gap-4'>
            {/* Image upload */}
            <div className='bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
                {isArtistUploading && <FileLoader progress={artistUploadProgress} />}
                {!isArtistUploading && (
                    <>{!artistImageCover 
                        ? <FileUploader 
                            updateState={setArtistImageCover} 
                            setProgress={setArtistUploadProgress} 
                            isLoading={setIsArtistUploading}
                            isImage={true}
                        /> 
                        : <div className='relative w-full h-full rounded-md flex justify-center'>
                            <img
                                src={artistImageCover}
                                className='object-cover h-full'
                                alt='' 
                            />

                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md hover:bg-red-400 duration-200 transition-all ease-in-out' onClick={() => deleteFileObject(artistImageCover)}>
                                <MdDelete className='text-white' />
                            </button>
                        </div>
                    }</>
                )}
            </div>
        </div>
    </div>
  )
}

export default NewArtist