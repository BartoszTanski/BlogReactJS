import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LoadingCircle from '@/components/pageControlls/LoadingCircle';
import DialogBox from '@/components/pageControlls/DialogBox';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const resetPassword = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const VERIFY_REGISTRATION_URL = `${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/auth/changePassword/${token}`;
    const [loading, setloading] = useState(false);
    const [passwordReseted, setpasswordReseted] = useState(false)
    const [passwordVisible, setpasswordVisible] = useState(false);
    const passwordInputRef = useRef(null);
    const [dialogBoxStatus, setdialogBoxStatus] = useState({open:false,message:null})
    const passwordRepeatInputRef = useRef(null);

    const showPassword = () => {
        if (passwordInputRef.current==null) return;
        setpasswordVisible((prev) => !prev)
        if (passwordInputRef.current.type=="password") {
            passwordInputRef.current.type="text";
            passwordRepeatInputRef.current.type="text";
        }
        else {
            passwordInputRef.current.type="password";
            passwordRepeatInputRef.current.type="password";
        }
      }

    const validPassword = () => {
        if (passwordInputRef.current.value.length<7) {
            setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordToShort})
            return false;
        }
        else if (passwordInputRef.current.value!=passwordRepeatInputRef.current.value) {
            setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordDoesNotMatch})
            return false;
        }
        else return true;
    }

    const sendNewPassword = async (e) => {
        e.preventDefault();
        if (token!=null&&token!=""&token) return;
        if (!validPassword()) return;
        const formData = new FormData();
        formData.append("password",passwordInputRef.current.value)
        await axios.put(VERIFY_REGISTRATION_URL,formData,{
            headers:{
                Accept:"application/json" 
        },})
        .then((res)=>{
            console.log(res);
            setloading(false);
            setpasswordReseted(true);
            setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordResetSuccessfull})
        })
        .catch((e)=> {
            console.log(e);
            setloading(false);
            setdialogBoxStatus({open:true,message:dialogBoxMessages.passwordResetFailure})
        });
        
    }
    
  
    return (
      <div className=' h-screen flex flex-grow p-3 items-stretch bg-[#161b22] text-gray-400 justify-center'> 
        <form className='flex flex-col flex-grow justify-center max-w-2xl bg-[#0e131a] space-y-6 p-6 border-4 border-[#161e25] rounded-3xl'>
            <p className='font-medium text-2xl md:text-3xl text-center p-6 '>Reset your password</p>
            <div className='relative'>
                <label htmlFor="password" className="block pl-4 text-sm font-medium text-gray-400">Password</label>
                <input id="password" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-[#0d1117] border-2 border-gray-800 px-4' type="password"
                ref={passwordInputRef}
                placeholder={"password"}>
                </input>
                    <div onClick={showPassword} className='absolute top-1/3 right-5 p-2 z-10'>
                    {(passwordVisible?<AiFillEye className='text-[22px] m-auto'/>:<AiFillEyeInvisible className='text-[22px] m-auto'/>)}
                    </div> 
            </div>
            <div>
                <label htmlFor="passwordRepeat" className="block pl-4 text-sm font-medium text-gray-400">Repeat password</label>
                <input id="passwordRepeat" className='rounded-xl h-12 w-full focus:outline-none font-medium border-2 border-gray-800 bg-[#0d1117] px-4' type="password"
                ref={passwordRepeatInputRef}
                placeholder={"repeat password"}>
                </input> 
            </div>
            <button className='rounded-md bg-[#191f27] border-2 border-gray-900 hover:bg-[#212833] hover:text-gray-300 
                cursor-pointer text-gray-400 h-10 text-lg font-bold' onClick={sendNewPassword}>
            Register</button>
        </form>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0  z-50 m-auto"/>)}
        {/*Dialog Boxes*/}
        {dialogBoxStatus.open&&(<DialogBox messageHead={dialogBoxStatus.message?.messageHead} message={dialogBoxStatus.message?.message} handleSucces={() => {
            setdialogBoxStatus({open:false});
            if (passwordReseted === true){
              signIn(undefined, { callbackUrl: '/' })
            }
          }}/>)}
      </div>
    )
  }

export default resetPassword