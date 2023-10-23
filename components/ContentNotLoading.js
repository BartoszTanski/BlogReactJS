import React from 'react'

const ContentNotLoading = ({reload}) => {
  var message = "Sorry something went wrong, please try reloading.";
  return (
    <div className='flex h-2/3 px-5 pt-8 font-semibold items-center justify-center flex-col'>
          <p className='px-3 pt-6 text-center'>{message}</p>
          <div >
            <button className='mt-4 py-3 px-6 rounded-lg bg-slate-300 hover:bg-slate-400' onClick={reload}>Reload</button>
          </div>
    </div>
  )
}

export default ContentNotLoading