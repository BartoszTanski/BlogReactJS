import React from 'react'
import StackItem from './StackItem';
import { AiOutlineMail,AiFillGithub, AiOutlineDownload, AiOutlinePhone} from 'react-icons/ai';
import { deleteVideo, getVideo } from '@/actions/videoActions';

const AboutMe = () => {
  return (
    <div className='px-3 py-5 space-y-1 bg-gray-50 w-60 rounded-md text-sm items-center justify-center'>
        <p className='text-3xl font-semibold'>Contact me:</p>
    <div className='text-center flex pb-2 px-2'>
        <p className=' font-semibold text-xl'>Bartosz Tański</p>
    </div>
    <div onClick={() => {navigator.clipboard.writeText("+48 517 296 185")}} className='flex px-2 shadow-md space-x-12 hover:bg-gray-200 hover:cursor-pointer hover:font-semibold rounded-md pb-1 pt-2 w-52'>
    <p>+48 517 296 185</p>
        <AiOutlinePhone size={25} className="mx-auto"/>
    </div>
    <div onClick={() => {navigator.clipboard.writeText("b.t4nsky@gmail.com")}} className='flex px-2 shadow-md space-x-6 hover:bg-gray-200 hover:cursor-pointer hover:font-semibold rounded-md pb-1 pt-2 w-52'>
    <p>b.t4nsky@gmail.com</p>
        <AiOutlineMail  size={25} className="mx-auto"/>
    </div>
    <a href="https://github.com/BartoszTanski" rel="noreferrer" target="_blank">
    <div className='flex space-x-16 shadow-md hover:bg-gray-200 hover:font-semibold rounded-md pt-2 px-2 w-52'>
    <p>See my github</p>
        <AiFillGithub  size={30} className="pb-1 mx-auto"/>
    </div>
    </a>
    <a href="/Bartosz_Tański_Resume.pdf" download>
    <div className='flex px-2 space-x-12 shadow-md hover:bg-gray-200 hover:font-semibold rounded-md pb-1 pt-2 w-52'>
    <p>Download my CV</p>
        <AiOutlineDownload  size={25} className="mx-auto"/>
    </div>
    </a>
    <div className='flex-col pt-8 px-2 font-semibold text-2xl rounded-md pb-1 w-52'>
    <p className='pb-1 pl-12'>My stack:</p>
        <StackItem text="Java 8+"/>
        <StackItem text="Java streams"/>
        <StackItem text="JUnit"/>
        <StackItem text="Spring boot"/>
        <StackItem text="Spring data JPA"/>
        <StackItem text="MySQL"/>
        <StackItem text="MongoDB"/>
        <StackItem text="SQL"/>
        <StackItem text="Mockito"/>
    </div>
    <div className='flex-col pt-8 px-2 font-semibold text-2xl rounded-md pb-1 w-52'>
    <p className='pb-1 pl-16'>Tools:</p>
        <StackItem text="Git"/>
        <StackItem text="Eclipse IDE"/>
        <StackItem text="Maven"/>  
    </div>
</div>
  )
}

export default AboutMe