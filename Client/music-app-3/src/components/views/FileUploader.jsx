import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { storage } from '../../config/firebase.config'
import { BiCloudUpload } from 'react-icons/bi'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'

const FileUploader = ({updateState, setProgress, isLoading, isImage}) => {
    const [{arlertType}, dispatch] = useStateValue()

    const uploadFile = (e) => {
        isLoading(true)
        const uploadedFile = e.target.files[0]

        const storageRef = ref(storage, `${isImage ? "Image" : "Audio"}/${Date.now()}-${uploadedFile.name}`)

        const uploadTask = uploadBytesResumable(storageRef, uploadedFile)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (error) => {
                console.log(error)
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
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateState(downloadURL)
                    isLoading(false)
                })
            },
        )
    }

    return (
        <label>
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex flex-col items-center justify-center cursor-pointer'>
                    <p className='font-bold text-2xl'><BiCloudUpload /></p>
                    <p className='text-lg'>Click to upload {isImage ? "image" : "audio"}</p>
                </div>
            </div>
            
            <input
                type='file'
                name='upload-file'
                accept={`${isImage ? "image/*" : "audio/*"}`}
                className={'w-0 h-0'} 
                onChange={uploadFile}
            />
        </label>
    )
}

export default FileUploader