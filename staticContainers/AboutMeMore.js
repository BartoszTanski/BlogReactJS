import React from 'react'
import StackItem from '../components/StackItem'
import { AiOutlineMail,AiFillGithub, AiOutlineDownload, AiOutlinePhone} from 'react-icons/ai';

const AboutMeMore = () => {
  return (
    <div className='flex-grow h-screen pt-4 mr-6 ml-6'>
    <div className='mx-auto max-w-md md:max-w-xl overflow-y-auto no-scrollbar lg:max-w-3xl' style={{height: "91%"}}>
        <div className='bg-white rounded-md shadow-inner shadow-gray-300 flex flex-col justify-center px-8 pb-6 overflow-y-auto no-scrollbar mt-3'>
            <div className='font-semibold text-center text-4xl pb-8 pt-10'>About me</div>
            <div className='text-sm md:text-base'>
                <p>&emsp; Hello! I am Bartosz Tański, currently I&apos;m a student of Computer Science and Econometry - part-time
Master&apos;s studies at the University of Gdańsk, during the week I learn programming. Right now im learning java and Spring boot as backend and react as a frontend for my applications. I can use streams and write unit tests. I am mobilized to learn and expand my knowledge in the programming area. I also know the basics of html, css, js, sql and databases (MySQL, MsSQL, MongoDb). I am able to start a full-time job immediately remotely or stationary in Bydgoszcz.</p>
            </div>
            <div className='font-semibold text-center text-2xl md:text-3xl mt-2 py-2'>Education</div>
            <div className='font-semibold text-xs md:text-base space-y-2'>
                <div className='flex justify-between'>
                <div>
                    <p>Bachelor degree - Informatyka i ekonometria - Data analysis methods</p>
                    <p>University of Gdańsk</p>
                </div>
                <p>2019-2022</p>
               </div>
               <div className='flex justify-between'>
                <div>
                    <p>Master&apos;s degree - Informatyka i ekonometria - IT applications in business</p>
                    <p>University of Gdańsk</p>
                </div>
                <p>2022-present</p>
               </div>
            </div>
            <div className='flex-col pt-5 px-2 font-semibold text-2xl md:text-3xl text-center rounded-md pb-1'>
                <p className='justify-center pb-2'>My tech stack:</p>
                <div className='grid grid-cols-2 gap-2'>
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
            </div>
            <div className='flex-col pt-5 px-2 font-semibold text-2xl md:text-3xl text-center rounded-md pb-4'>
                <p className='justify-center pb-2'>Tools I use:</p>
                <div className='grid grid-cols-2 gap-2'>
                    <StackItem text="Git"/>
                    <StackItem text="Eclipse IDE"/>
                    <StackItem text="Maven"/> 
                </div>
            </div>
            <div className='justify-center items-center'>
                <p className='text-2xl md:text-3xl text-center font-semibold'>Contact me:</p>
                <div className='text-center pb-2 px-2'>
                    <p className=' font-normal text-lg'>Bartosz Tański, Bydgoszcz</p>
                </div>
               <div className='grid md:grid-cols-2 gap-2 justify-items-center'>
                     <div onClick={() => {navigator.clipboard.writeText("+48 517 296 185")}} className='flex px-2 shadow-md space-x-11 hover:bg-gray-200 hover:cursor-pointer hover:font-semibold rounded-md pb-1 pt-2 w-52'>
                        <p>+48 517 296 185</p>
                        <AiOutlinePhone size={25} className="mx-auto"/>
                    </div>
                    <div onClick={() => {navigator.clipboard.writeText("b.t4nsky@gmail.com")}} className='flex px-2 shadow-md space-x-4 hover:bg-gray-200 hover:cursor-pointer hover:font-semibold rounded-md pb-1 pt-2 w-52'>
                        <p>b.t4nsky@gmail.com</p>
                        <AiOutlineMail  size={25} className="mx-auto"/>
                    </div>
                    <a href="https://github.com/BartoszTanski" rel="noreferrer" target="_blank">
                        <div className='flex space-x-14 shadow-md hover:bg-gray-200 hover:font-semibold rounded-md pt-2 px-2 w-52'>
                        <p>See my github</p>
                            <AiFillGithub  size={30} className="pb-1 mx-auto"/>
                    </div>
                    </a>
                    <a href="/resources/Bartosz_Tański_Resume.pdf" download>
                        <div className='flex px-2 space-x-10 shadow-md hover:bg-gray-200 hover:font-semibold rounded-md pb-1 pt-2 w-52'>
                        <p>Download my CV</p>
                        <AiOutlineDownload  size={25} className="mx-auto"/>
                        </div>
                    </a>
                </div>
            </div>
            <div className='mt-12 text-center'>
            <p className=' font-normal text-lg'>Thank you for visiting my website!</p>
            <div className=' py-10'></div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AboutMeMore