import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import {motion} from 'framer-motion'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'

const FilterButton = ({filterData, flag}) => {
  const [filterName, setFilterName] = useState(null)
  const [filterMenu, setFilterMenu] = useState(false)

  const [{userFilter, albumFilter, languageFilter, categoryFilter}, dispatch] = useStateValue()

  const updateFilterButton = (data) => {
    setFilterMenu(false)
    setFilterName(data.name)

    if(flag === "User") {
      dispatch({
        type: actionType.SET_USER_FILTER,
        userFilter: data,
      })
    }

    if(flag === "Album") {
      dispatch({
        type: actionType.SET_ALBUM_FILTER,
        albumFilter: data,
      })
    }

    if(flag === "Language") {
      dispatch({
        type: actionType.SET_LANGUAGE_FILTER,
        languageFilter: data.name,
      })
    }

    if(flag === "Category") {
      dispatch({
        type: actionType.SET_CATEGORY_FILTER,
        categoryFilter: data.name,
      })
    }
  }

  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-500'>
        <p className='text-base tracking-wide text-textColor flex items-center gap-2' onClick={() => setFilterMenu(!filterMenu)}>
          {!filterName && flag}
          {filterName && 
            <>{filterName.length > 15 ? `${filterName.slice(0,14)}...` : filterName}</> 
          }

          <IoChevronDown className={`text-base text-textColor transition-all duration-150 ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"}`} />
        </p>

        {filterData && filterMenu && (
          <motion.div 
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 5}}
            exit={{opacity: 0, y: 50}}
            className='w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll py-2 flex flex-col rounded-md shadow-md absolute left-0 top-8 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400'
          >
            {filterData?.map((data) => (
              <div key={data._id} className='flex items-center px-4 py-1 gap-2 hover:bg-gray-200' onClick={() => updateFilterButton(data)}>
                {(flag === "User" || flag === "Album") && (
                  <img 
                    src={data.imageURL}
                    className='w-8 min-w-[32px] h-8 rounded-full object-cover' 
                  />
                )}

                <p className='w-full'>
                  {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
                </p>
              </div>
            ))}
          </motion.div>
        )}
        
    </div>
  )
}

export default FilterButton