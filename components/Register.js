import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DialogBox from './pageControlls/DialogBox';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import LoadingCircle from './pageControlls/LoadingCircle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {signIn} from 'next-auth/react';
import Link from 'next/link';


const Register = () => {
    const REGISTER_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/auth/register`;
    const [loading, setloading] = useState(false);
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [userRegistered, setuserRegistered] = useState(false)

    const inputRefFirstname = useRef(null);
    const inputRefLastname = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword= useRef(null);
    const inputRefPasswordRepeat = useRef(null);
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

    const [dialogBoxStatus, setdialogBoxStatus] = useState({open:false,message:null})

  const showPassword = () => {
    if (inputRefPassword.current==null) return;
    setpasswordVisible((prev) => !prev)
    if (inputRefPassword.current.type=="password") {
        inputRefPassword.current.type="text";
        inputRefPasswordRepeat.current.type="text";
    }
    else {
        inputRefPassword.current.type="password";
        inputRefPasswordRepeat.current.type="password";
    }
  }

  const validInputFields = () => {
    if (inputRefFirstname.current.value.length<3  ) {
        setdialogBoxStatus({open:true,message:dialogBoxMessages.firstnameToShort})
        return false;
    }
    if (inputRefLastname.current.value.length<3) {
      setdialogBoxStatus({open:true,message:dialogBoxMessages.lastnameToShort})
      return false;
  }
    else if(!emailRegex.test(inputRefEmail.current.value)) {
        setdialogBoxStatus({open:true,message:dialogBoxMessages.emailNotValid})
        return false;
    }
    else if (inputRefPassword.current.value.length<7) {
        setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordToShort})
        return false;
    }
    else if (inputRefPassword.current.value!=inputRefPasswordRepeat.current.value) {
        setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordDoesNotMatch})
        return false;
    }
    else return true;
    
 }
  {/*SUBMIT CHANGES BUTTON ON CLICK*/}
  const sendRegistrationForm = async (e) => {
    e.preventDefault();
    if (!validInputFields()) return;
    setloading(true);
    const data ={
      "firstName":inputRefFirstname.current.value,
      "lastName":inputRefLastname.current.value,
      "password":inputRefPassword.current.value,
      "email":inputRefEmail.current.value,
      "profilePic": "/resources/anonimousUser.jpg",
    }

    axios.post(REGISTER_API_ENDPOINT,data,{
      headers:{
        Accept:"application/json" 
      },})
      .then((response)=>{
        setloading(false);
        setuserRegistered(true);
        setdialogBoxStatus({open:true,message:dialogBoxMessages.userRegisteredSucessfully})
      })
      .catch((error)=>{
        console.log(error);
        setloading(false);
        setdialogBoxStatus({open:true,message:{messageHead:"Registration failed.",message:error.response.data?.message}})
      })
  }

  return (
    <div className='bg-white flex flex-grow max-w-xl py-10 -mt-40 justify-center flex-col rounded-md shadow-md text-gray-500 p-2'>
        <p className='font-medium justify-center text-center text-3xl'>Register</p>
        <div className='p-4 flex space-x-2'>
        <form className='flex flex-col flex-grow space-y-2'>
              <div>
                  <label htmlFor="firstname" className="block pl-4 text-sm font-medium text-gray-500">Firstname</label>
                  <input id="firstname" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefFirstname}
                   placeholder={"firstname"}>
                  </input> 
              </div>
              <div>
                  <label htmlFor="lastname" className="block pl-4 text-sm font-medium text-gray-500">Lastname</label>
                  <input id="lastname" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefLastname}
                   placeholder={"lastname"}>
                  </input> 
              </div>
              <div>
                  <label htmlFor="email" className="block pl-4 text-sm font-medium text-gray-500">Email</label>
                  <input id="email" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="email"
                   ref={inputRefEmail}
                   placeholder={"email"}>
                  </input> 
              </div>
              <div className='relative'>
                  <label htmlFor="password" className="block pl-4 text-sm font-medium text-gray-500">Password</label>
                  <input id="password" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="password"
                   ref={inputRefPassword}
                   placeholder={"password"}>
                  </input>
                    <div onClick={showPassword} className='absolute top-1/3 right-5 p-2 z-10'>
                    {(passwordVisible?<AiFillEye className='text-[22px] m-auto'/>:<AiFillEyeInvisible className='text-[22px] m-auto'/>)}
                    </div> 
              </div>
              <div>
                  <label htmlFor="passwordRepeat" className="block pl-4 text-sm font-medium text-gray-500">Repeat password</label>
                  <input id="passwordRepeat" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="password"
                   ref={inputRefPasswordRepeat}
                   placeholder={"repeat password"}>
                  </input> 
              </div>
              <div className='flex flex-col px-3 py-5 '>
                  <button className='rounded-md bg-gray-300 hover:bg-gray-400 hover:text-gray-700 cursor-pointer text-gray-600 h-10 text-lg font-bold' onClick={sendRegistrationForm}>
                  Register</button>
              </div>
        </form>
    </div>
          {/*Remeber password*/}
        <div className='flex flex-col justify-center align-middle items-center '>
             <Link
                  href="/sendResetPasswordEmail"
                  className='bg-gray-200 hover:bg-gray-300 font-medium text-center text-gray-600 block w-full px-2 rounded-sm text-sm border-t'>
                  Reset Password
                </Link>
        </div>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0  z-50 m-auto"/>)}
          {/*Dialog Boxes*/}
        {dialogBoxStatus.open&&(<DialogBox messageHead={dialogBoxStatus.message?.messageHead} message={dialogBoxStatus.message?.message} handleSucces={() => {
            setdialogBoxStatus({open:false});
            if (userRegistered === true){
              signIn(undefined, { callbackUrl: '/' })
            }
          }}/>)}
    </div>
  )
}

export default Register


