import React from 'react'

const PostInputFields = ({inputRefTitle,inputRefDesc,inputRefTags, defaultTitle, defaultDescription, defaultTags}) => {
  return (
    <div className='p-4 pt-5   space-x-2'>
        <form className='flex flex-col space-y-2 pr-2'>
              <div>
                  <label className="block pl-4 text-sm font-medium text-gray-500 ">Title</label>
                  <input id="title" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefTitle} defaultValue={defaultTitle}
                   placeholder={`Title:`}>
                  </input> 
              </div>
              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Description</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                  ref={inputRefDesc} defaultValue={defaultDescription}
                  placeholder={`Description:`}>
                </input> 
              </div>

              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Tags separated by &apos;,&apos;</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                ref={inputRefTags} defaultValue={defaultTags}
                placeholder={`Tags:`}>
                </input>  
              </div>
        </form>
    </div>
  )
}

export default PostInputFields