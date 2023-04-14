import React from 'react'

const StackItem = ({text}) => {
  return (
    <div className='bg-gray-200 text-gray-700 text-center my-1 px-3 text-lg hover:shadow-sm hover:bg-gray-300 hover:shadow-slate-400 font-semibold rounded-lg'>{text}</div>
  ) 
}

export default StackItem