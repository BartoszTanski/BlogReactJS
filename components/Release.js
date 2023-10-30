import Image from 'next/image';
import React from 'react';
import { HiFire } from 'react-icons/hi';
import Link from 'next/link';

const Release = ({release}) => {
  let newDate = new Date();
  let hour = newDate.getHours()+1-parseInt(release.time?.substring(11, 13),10);
  let minutes = newDate.getMinutes()-parseInt(release.time?.substring(14, 16),10);
  let date = newDate.getDate()-parseInt(release.time?.substring(8, 10),10);
  let month = newDate.getMonth() + 1-parseInt(release.time?.substring(5, 7),10);
  let year = newDate.getFullYear()-parseInt(release.time?.substring(0, 4),10);
  const datetime = year>0?year+" years ago":(month>0?month+" months ago":(date>0?date+" days ago":(hour>0?hour+" hours ago":(minutes>0?minutes+" minutes ago":"now"))));
  return (
    <div key={release.id}>
      <Link href={{
                    pathname: `/posts/[postId]`,
                    query: { postId: release.id},
                  }}>
      <div className='flex-col items-center space-x-2 pb-2 pt-1 pl-1 text-center hover:bg-gray-200 shadow-inner shadow-slate-200 rounded-sm cursor-pointer relative'> 
          <p className='hidden p-1 font-semibold text-md sm:inline-flex text-sm'>{release.title}</p>
          <Image src={release.image} height={100} width={200} className=' rounded-sm  h-[100px] w-[200px]' alt="Foto"  />
          <div className='flex flex-row px-3 justify-between pt-1'>
            <div className='flex flex-row'>
            <p className='hidden sm:inline-flex text-sm'>{''+release.likes}</p>
            <HiFire size={20} color="red"/>
            </div>
            <p className='pr-6 hidden sm:inline-flex text-sm'>{datetime}</p>
          </div>
        
      </div>
      </Link>
    </div>
  )
}

export default Release