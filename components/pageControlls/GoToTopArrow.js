import React from 'react'
import Link from 'next/link'
import { FaArrowUp } from 'react-icons/fa'

export const GoToTopArrow = () => {
  return (
    <button className="fixed md:right-1/3 z-50 bottom-0 right-0 p-5 m-5">
          <Link className='scroll-smooth ' href={"/#home"}>
            <FaArrowUp className='md:h-14 text-gray-800 md:w-10 w-8 h-12' />
          </Link>   
    </button>
  )
}
