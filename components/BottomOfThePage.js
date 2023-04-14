import React from 'react'

const BottomOfThePage = () => {
  return (
    <div className='h-80 px-10 rounded-2xl bg-gray-100 pt-10'>
        <div className=' h-6'></div>
        <div className='text-xl md:text-3xl  text-ellipsis flex-shrink text-gray-500'>
        <p className='flex-1 flex-wrap'>You reached bottom of the page,</p>
        <p className='flex-1 flex-wrap'>Nothing more to display :(</p>
        </div>
    </div>
  )
}

export default BottomOfThePage