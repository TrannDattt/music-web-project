import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const DashboardArtists = () => {
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex items-center justify-center gap-20'>
        {/* ?????? */}
        <NavLink to={"/dashboard/newArtist"} className='flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer'>
          <IoAdd />
        </NavLink>
      </div>
    </div>
  )
}

export default DashboardArtists