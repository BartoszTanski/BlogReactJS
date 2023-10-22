import React from 'react'
import { BiErrorAlt } from 'react-icons/bi'

const ContentNotLoading = ({reload}) => {
  var message = "Sorry something went wrong, please try reloading.";
  //var messageHead = "Sorry, something went wrong :(";
  return (
    <div className='flex h-2/3 px-5 pt-8 font-semibold items-center justify-center flex-col'>
          {/* <BiErrorAlt size={60} className='text-red-600'/>
          <p className='pb-10 pt-3'>{messageHead}</p>
          <p>{message}</p>
          <p className='pt-2 text-center'>U can check server status here:</p>
          <a className='text-blue-700' target="_blank" rel="noopener noreferrer"
          href='https://blogbartosz.azurewebsites.net/api/v1/hello'>
          <p>Link</p>
          </a> */}
          <p className='px-3 pt-6 text-center'>{message}</p>
          <div >
            <button className='mt-4 py-3 px-6 rounded-lg bg-slate-300 hover:bg-slate-400' onClick={reload}>Reload</button>
          </div>
    </div>
  )
}

export default ContentNotLoading