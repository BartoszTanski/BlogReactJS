import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DialogBox from './DialogBox';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import LoadingCircle from './LoadingCircle';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
    const REGISTER_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/auth/register`;
    const [loading, setloading] = useState(false);
    const [passwordVisible, setpasswordVisible] = useState(false);

    const inputRefUsername = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword= useRef(null);
    const inputRefPasswordRepeat = useRef(null);
    const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$");

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
    if (inputRefUsername.current.value.length<5) {
        setdialogBoxStatus({open:true,message:dialogBoxMessages.usernameToShort})
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
    const formData = new FormData();
    formData.append("username",inputRefUsername.current.value);
    formData.append("password",inputRefPassword.current.value);
    formData.append("email",inputRefEmail.current.value);

    axios.post(REGISTER_API_ENDPOINT,formData,{
      headers:{
        Accept:"application/json" 
      },})
      .then((response)=>{
        setloading(false);
        setdialogBoxStatus({open:true,message:dialogBoxMessages.userRegisteredSucessfully})
      })
      .catch((error)=>{
        console.log(error);
        setloading(false);
        setdialogBoxStatus({open:true,message:{messageHead:"Registration failed.",message:error.data?.message}})
      })
  }

  return (
    <div className='bg-white flex flex-grow max-w-xl py-10 -mt-40 justify-center flex-col rounded-md shadow-md text-gray-500 p-2'>
        <p className='font-medium justify-center text-center text-3xl'>Register</p>
        <div className='p-4 flex space-x-2'>
        <form className='flex flex-col flex-grow space-y-2'>
              <div>
                  <label htmlFor="username" className="block pl-4 text-sm font-medium text-gray-500">Username</label>
                  <input id="username" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefUsername}
                   placeholder={"username"}>
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
        </form>
    </div>
          {/*SUBMIT BUTTON*/}
        <div className='flex flex-col px-3 py-5 '>
            <button className='rounded-md bg-gray-300 hover:bg-gray-400 hover:text-gray-700 cursor-pointer text-gray-600 h-10 text-lg font-bold' onClick={sendRegistrationForm}>
            Register</button>
        </div>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0  z-50 m-auto"/>)}
          {/*Dialog Boxes*/}
        {dialogBoxStatus.open&&(<DialogBox messageHead={dialogBoxStatus.message?.messageHead} message={dialogBoxStatus.message?.message} handleSucces={()=>setdialogBoxStatus({open:false})}/>)}
    </div>
  )
}

export default Register


