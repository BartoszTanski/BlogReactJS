import React from 'react'
import { useState, useRef } from 'react';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import LoadingCircle from '@/components/pageControlls/LoadingCircle';
import DialogBox from '@/components/pageControlls/DialogBox';
import axios from 'axios';

const sendResetPasswordEmail = () => {

    const RESET_PASSWORD_URL = process.env.NEXT_PUBLIC_PAGE_BASEURL+"api/v1/auth/sendChangePasswordEmail/";
    const [loading, setloading] = useState(false);
    const [emailSend, setemailSend] = useState(false)
    const emailInputRef = useRef(null);
    const [dialogBoxStatus, setdialogBoxStatus] = useState({open:false,message:null})
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

    const sendResetPasswordEmail = async (e) => {
        e.preventDefault();
         if(!emailRegex.test(emailInputRef.current.value)) {
            setdialogBoxStatus({open:true,message:dialogBoxMessages.emailNotValid})
            return;}

        await axios.get(RESET_PASSWORD_URL+emailInputRef.current.value,{
            headers:{
                Accept:"application/json" 
        },})
        .then((res)=>{
            console.log(res);
            setloading(false);
            setemailSend(true);
            setdialogBoxStatus({open:true,message:dialogBoxMessages.resetPasswordEmailSendSuccess})
        })
        .catch((e)=> {
            console.log(e);
            setloading(false);
            setdialogBoxStatus({open:true,message:dialogBoxMessages.resetPasswordEmailSendFailure})
        });
        
    }
    
  
    return (
      <div className=' h-screen flex flex-grow p-3 items-stretch bg-[#161b22] text-gray-400 justify-center'> 
        <form className='flex flex-col flex-grow justify-center max-w-2xl bg-[#0e131a] space-y-6 p-6 border-4 border-[#161e25] rounded-3xl'>
            <p className='font-medium text-2xl md:text-3xl text-center p-6 '>Reset your password</p>
            <div className='relative'>
                <label htmlFor="email" className="block pl-4 text-sm font-medium text-gray-400">Email</label>
                <input id="email" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-[#0d1117] border-2 border-gray-800 px-4' type="text"
                ref={emailInputRef}
                placeholder={"email"}>
                </input>
            </div>

            <button className='rounded-md bg-[#191f27] border-2 border-gray-900 hover:bg-[#212833] hover:text-gray-300 
                cursor-pointer text-gray-400 h-10 text-lg font-bold' onClick={sendResetPasswordEmail}>
            Send link</button>
        </form>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0  z-50 m-auto"/>)}
        {/*Dialog Boxes*/}
        {dialogBoxStatus.open&&(<DialogBox messageHead={dialogBoxStatus.message?.messageHead} message={dialogBoxStatus.message?.message} handleSucces={() => {
            setdialogBoxStatus({open:false});
            if (emailSend === true){
              signIn(undefined, { callbackUrl: '/' })
            }
          }}/>)}
      </div>
    )
  }

export default sendResetPasswordEmail