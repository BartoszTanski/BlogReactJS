import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link';

const Login = () => {
  return (
    <div className='flex flex-col justify-center space-y-10 items-center mx-auto min-h-screen'>
        {/* <div className='py-10'><Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Facebook_Logo_%282015%29_light.svg/1920px-Facebook_Logo_%282015%29_light.svg.png" height={240} width={240} alt={"Fb logo"} className='h-[50px] w-[240px]'/>
        </div> */}
        <div className='items-center justify-center bg-emerald-500 p-2 rounded-md'><a onClick={signIn} className='px-20 py-2 w-56 text-2xl cursor-pointer text-center rounded-md text-white'>
        <p>Sign in with Social media</p>
        <p>(Facebook, Github, Google)</p>
        <p>or</p>
        <p>as Jack (anonymous)</p>
        </a>
        </div>
        <div className=' h-14 w-56  mt-10 mb-2 justify-center text-center text-white text-bold text-xl bg-gray-700 rounded-lg p-4'>
        <Link href={{
            pathname: "/",
            
            }} >
        <div>
            Back to Homepage
        </div>
        </Link>
    </div>
    </div>
  );
};

export default Login