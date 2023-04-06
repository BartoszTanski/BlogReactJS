import React from 'react'
import Image from 'next/image'
import {HiOutlineSearch} from 'react-icons/hi';
import {HiOutlineHome} from 'react-icons/hi';
import {BsFileEarmarkPlus} from 'react-icons/bs';
import {RiFlag2Line} from 'react-icons/ri'
import {MdOutlineOndemandVideo, MdOutlineExpandMore} from 'react-icons/md'
import {AiOutlineShop, AiFillMessage, AiFillBell} from "react-icons/ai"
import {IoGameControllerOutline} from 'react-icons/io5'
import {CgMenuGridO} from 'react-icons/cg'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
 

const Header = () => {
    const {data: session} = useSession();
  return (
    <div className='bg-white flex items-center p-2 shadow-md top-0 sticky z-50 h-16 '>
        {/*Left*/}
        <div className='flex min-w-fit'>
            <img src="/icon.png" alt="logo" className=' rounded-full' height={40} width={40}></img>
            <div className='flex items-center space-x-2 px-2 ml-2 rounded-full bg-gray-100 text-gray-500'>
            <HiOutlineSearch size={20}/>
                <input className='hidden lg:inline-flex bg-transparent focus:outline-none' type="text" placeholder='Search Blog'></input>
            </div>
        </div>
        {/*Center*/}
        <div className='flex flex-grow justify-center mx-2'>
            <div className='flex items-center'>
                <Link href={{
                pathname: '/',
                query: { },
                }} className='text-xs sm:text-base'>
                    <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                    <HiOutlineHome size={25} className="mx-auto"/> 
                    </div>
                </Link>
                <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                <RiFlag2Line size={25} className="mx-auto"/> 
                </div>
                <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                <MdOutlineOndemandVideo size={25} className="mx-auto"/> 
                </div>
                <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                <AiOutlineShop size={25} className="mx-auto"/> 
                </div>
                <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                <IoGameControllerOutline size={25} className="mx-auto"/> 
                </div>
                <Link href={{
                pathname: '/posts/createPost',
                query: {},
                }} className='text-xs sm:text-base'>
                    <div className='flex items-center h-14 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer '>
                    <BsFileEarmarkPlus size={25} className="mx-auto"/> 
                    </div>
                </Link>
            </div>
        </div>
        {/*Right*/}
            <div className='flex items-center justify-end min-w-fit space-x-2'>
             <img src={session?.user.image} height={40} width={40} alt="profilePic" className="rounded-full border border-gray-300 cursor-pointer"
             onClick={signOut}
             >
            </img>
                <p className='hidden xl:inline-flex font-semibold text-sm whitespace-nowrap p-3 max-w-xs'>
                {session?.user.name.split(" ")[0]}
                </p>
                <CgMenuGridO size={25} className="hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full cursor-pointer p-2 hover:bg-gray-300"/>
                <AiFillMessage size={25} className="hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full cursor-pointer p-2 hover:bg-gray-300"/>
                <AiFillBell size={25} className="hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full cursor-pointer p-2 hover:bg-gray-300"/>
                <MdOutlineExpandMore size={25} className="hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full cursor-pointer p-2 hover:bg-gray-300"/>
            </div>
    </div>
  )
}

export default Header