import React from 'react'

const AdTest = () => {
  return (
    <div>
        <div className='flex-row h-screen text-center relative items-center border-x-zinc-200 border-4 border-solid font-extrabold text-4xl space-y-60 text-black bg-amber-300'>
            <div className=' items-center  h-full space-y-10  px-4'>
                <div className='h-1/5 pt-12 font-semibold italic text-4xl text-slate-100'> SPECIAL OFFER</div>
                <p className=' -rotate-45'>-50%</p>
                <p className=' -rotate-45'>-70%</p>
                <p className='py-4 '>BLACK FRIDAY</p>
                <p className='font-normal text-7xl pb-8'>SALE</p>
                <p className='p-6 rounded-2xl text-3xl bg-red-500 hover:bg-red-600'>ORDER NOW</p>
            </div>
        </div>
    </div>
  )
}

export default AdTest