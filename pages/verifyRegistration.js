import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import LoadingCircle from '@/components/pageControlls/LoadingCircle';
import DialogBox from '@/components/pageControlls/DialogBox';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import Router from 'next/router';

const verifyRegistration = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const VERIFY_REGISTRATION_URL = `${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/auth/verifyRegistration/${token}`;
  const [loading, setloading] = useState(true);
  const [dialogBoxStatus, setdialogBoxStatus] = useState({open:false,message:null})
  const [verificationSuccess, setverificationSuccess] = useState(false)

  useEffect(() => {
    if (token!=null&&token!=""&token) {
        axios.get(VERIFY_REGISTRATION_URL,{
            headers:{
              Accept:"application/json" 
            },})
            .then((res)=>{
                console.log(res);
                setloading(false);
                setverificationSuccess(true);
                setdialogBoxStatus({open:true,message:dialogBoxMessages.emailVerificationSuccessfull})
            })
            .catch((e)=> {
                console.log(e);
                setloading(false);
                setdialogBoxStatus({open:true,message:dialogBoxMessages.emailVerificationFailure})
            });
    } else {setloading(false)
    setdialogBoxStatus({open:true,message:dialogBoxMessages.emailVerificationFailure})
    }
}, [])
  

  return (
    <div className=' bg-[#161b22] h-screen text-gray-400 flex items-center align-middle justify-center'>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0 z-50 m-auto"/>)}
          {/*Dialog Boxes*/}
        {!loading&&(<div>
            <div className='h-24 w-52 lg:h-[200px] lg:w-[400px] flex font-medium text-gray-400 text-2xl lg:text-5xl rounded-xl bg-gray-800 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-300' onClick={()=>Router.push("/")}>
                <p className='flex items-center text-center p-3'>Back To Homepage</p>
            </div>
        </div>)}
        {dialogBoxStatus.open&&(<DialogBox messageHead={dialogBoxStatus.message?.messageHead} message={dialogBoxStatus.message?.message} handleSucces={() => {
            setdialogBoxStatus({open:false});
            if (verificationSuccess === true){
              signIn(undefined, { callbackUrl: '/' })
            }
          }}/>)}
    </div>
  )
}

export default verifyRegistration