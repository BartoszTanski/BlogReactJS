import React from 'react'
import { BiErrorAlt } from 'react-icons/bi'

const ContentNotLoading = () => {
  var message = "Couldn't retrive posts data. Please contact us if this problem reoccurs.";
  var messageHead = "Sorry, something went wrong :(";
  return (
    <div className='flex h-2/3 px-5 pt-8 font-semibold items-center justify-center flex-col'>
          <BiErrorAlt size={60} className='text-red-600'/>
          <p className='pb-10 pt-3'>{messageHead}</p>
          <p>{message}</p>
          <p className='pt-2 text-center'>U can check server status here:</p>
          <a className='text-blue-700' target="_blank" rel="noopener noreferrer"
          href='https://blogbartosz.azurewebsites.net/api/v1/hello'>
          <p>Link</p>
          </a>
    </div>
  )
}

export default ContentNotLoading