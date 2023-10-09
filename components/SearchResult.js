import React from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import Link from 'next/link';

const SearchResult = ({result}) => {
    var datetime =result.time?.substring(11, 16) +" "+result.time?.substring(8, 10)+"/"+result.time?.substring(5, 7)+"/"+result.time?.substring(0, 4);
  return (
    <Link href={{
      pathname: `/posts/[postId]`,
      query: { postId: result.id},
      }}>
    <div className='bg-white pl-2 flex flex-col justify-between align-middle mt-1 rounded-md hover:bg-gray-100 border text-gray-500'>
        <div className='w-64 px-1 pt-1'>
            <p className='w-64 text-sm font-semibold overflow-x-hidden'>{result.title}</p>
            <p className='text-xs font-normal'>{result.description}</p>
        </div>
        <div className='flex flex-row justify-start'>
        <p className='py-1 pl-2 pr-1 text-xs text-blue-400'>{result.likes}</p>
        <FiThumbsUp className='h-4 my-1 text-blue-400'/>
        <p className='py-1 pl-16 text-xs'>{result.author+" "+datetime}</p>
        </div>
    </div>
    </Link>
  )
}

export default SearchResult