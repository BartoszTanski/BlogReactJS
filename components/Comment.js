import React from 'react'

const Comment = ({comment}) => {
    var datetime =comment.time?.substring(11, 16)+" "+comment.time?.substring(8, 10)+comment.time?.substring(4, 8)+comment.time?.substring(0, 4)
  return (
    <div>
    {comment.content !=null &&(<div className='bg-white rounded-md' key={comment.id}>
        <div className='flex flex-grow-0'>
             <div className='flex flex-row min-w-fit py-2 pl-2 rounded-l-xl '>
            <div className='p-1'>
            <img src={comment.profilePic} height={40}  alt="profilePic"   width={40} className='rounded-full border border-gray-300'></img>
            </div>
          </div>
            <div className='m-2 p-2 overflow-ellipsis overflow-hidden bg-gray-100 rounded-2xl min-h-max flex-grow '>
                <div className='flex text-xs space-x-2'>
                <p className='font-bold'>{comment.author}</p>
                <p >{datetime}</p>
                </div>
          
                <div className='' >
                  <p className=''>{comment.content}</p></div>
            </div>
        </div>
    </div>)}
    </div>
  )
}

export default Comment