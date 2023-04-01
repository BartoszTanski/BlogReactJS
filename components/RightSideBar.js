import React from 'react'
import { RiVideoAddFill } from 'react-icons/ri'
import {BiSearch} from 'react-icons/bi';
import { CgMoreAlt } from 'react-icons/cg';
import Contacts from './Contacts';

const RightSideBar = () => {
  return (
    <div className='hidden md:inline-flex flex-col max-w-xl pt-4 md:min-w-[200px] lg:min-w-[250px]'>
        <div className='flex items-center text-gray-500'>
            <p className='flex text-lg font-semibold flex-grow'>Contacts</p>
            <div className='flex space-x-1 px-2'>
                <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
                    <RiVideoAddFill/>
                </div>
                <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
                    <BiSearch/>
                </div>
                <div className='rounded-full p-2 hover:bg-gray-200 cursor-pointer'>
                    <CgMoreAlt/>
                </div>
            </div>
        </div>
        
        <Contacts src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600" name="Shabbir Dawoodi" alt="person1" status="Online"/>
        <Contacts src="https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&w=600" name="Nikhil Sahana" alt="person2" status="Online"/>
        <Contacts src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600" name="Jan Kowalski" alt="person3" status="Online"/>
        <Contacts src="https://images.pexels.com/photos/15798792/pexels-photo-15798792.jpeg?auto=compress&cs=tinysrgb&w=600" name="Justyna Nowak"  alt="person4" status="Offline"/>
        
    </div>
  )
}

export default RightSideBar