import React from 'react'
import SongCard from './SongCard'

const SongContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && (
        data.map((song, index) => (
          <SongCard key={song._id} data={song} index={index} type="song" />
        ))
      )}
    </div>
  )
}

export default SongContainer