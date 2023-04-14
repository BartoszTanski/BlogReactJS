import React from 'react'
import Image from 'next/image'
import {HiOutlineSearch} from 'react-icons/hi';
import {HiOutlineHome} from 'react-icons/hi';
import {BsFileEarmarkPlus} from 'react-icons/bs';
import {SiAboutdotme} from 'react-icons/si'
import {useSession } from 'next-auth/react';
import Link from 'next/link';
import DropDownMenu from './DropDownMenu';
import SearchRegex from './SearchRegex';
 

const Header = () => {
    const {data: session} = useSession();
  return (
    <div className='bg-white flex items-center p-2 shadow-md top-0 sticky z-50 h-16 '>
        {/*Left*/}
        <img src="/icon.png" alt="logo" className=' rounded-full' height={40} width={40}></img>
        <div className='hidden pl-6 lg:inline-flex'><SearchRegex/></div>
        {/*Center*/}
        <div className='flex flex-grow justify-center mx-2'>
            <div className='flex items-center'>
                <Link href={{
                pathname: '/',
                query: { },
                }} className='text-xs '>
                    <div className='flex items-center h-14 px-3 md:px-10 lg:px-28 rounded-md hover:bg-gray-100 cursor-pointer '>
                    <p className='text-xl font-semibold hidden md:inline-flex'>Home</p><HiOutlineHome size={25} className="mb-1 mx-auto"/> 
                    </div>
                </Link>
                <Link href={{
                pathname: '/posts/createPost',
                query: {},
                }} className='text-xs sm:text-base'>
                    <div className='flex items-center px-3 h-14 md:px-10 lg:px-24 rounded-md hover:bg-gray-100 cursor-pointer '>
                    <p className='text-xl font-semibold hidden md:inline-flex'>Add Post</p><BsFileEarmarkPlus size={25} className="mb-1 mx-auto"/> 
                    </div>
                </Link>
                <Link href={{
                pathname: '/aboutMe',
                query: {},
                }} className='text-xs sm:text-base'>
                    <div className='flex items-center px-3 h-14 md:px-10 lg:px-28 rounded-md hover:bg-gray-100 cursor-pointer '>
                    <p className='text-xl font-semibold hidden md:inline-flex'>About</p><SiAboutdotme size={25} className="mb-1 mx-auto"/> 
                    </div>
                </Link>
            </div>
        </div>
        {/*Right*/}
            <div className='flex items-center justify-end min-w-fit space-x-4'>
             <img src={session?session.user.image:"/anonimousUser.jpg"} height={40} width={40} alt="profilePic" className="rounded-full border border-gray-300"
             >
            </img>
                <p className='hidden xl:inline-flex font-semibold text-sm whitespace-nowrap p-3 max-w-xs'>
                {session?session.user.name.split(" ")[0]:"Not logged in"}
                </p>
                <DropDownMenu/>
            </div>
    </div>
  )
}

export default Header