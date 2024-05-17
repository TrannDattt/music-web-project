import React from 'react'

const FileLoader = ({progress}) => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <p className='text-xl font-semibold text-textColor'>
                {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
            </p>

            <div className='h-10 w-10 min-w-[40px] bg-red-400 animate-ping rounded-full flex items-center justify-center relative'>
                <div className='absolute inset-0 rounded-full bg-red-400 blur-xl'></div>
            </div>
        </div>
    )
}

export default FileLoader