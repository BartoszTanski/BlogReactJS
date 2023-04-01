import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center mx-auto min-h-screen'>
        <div className='py-10'><Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Facebook_Logo_%282015%29_light.svg/1920px-Facebook_Logo_%282015%29_light.svg.png" height={240} width={240} alt={"Fb logo"}/>
        </div>
        <div><a onClick={signIn} className='px-20 py-4 z-10 text-2xl cursor-pointer  bg-blue-500 rounded-md text-white'>
        Login
        </a>
        </div>
    </div>
  );
};

export default Login