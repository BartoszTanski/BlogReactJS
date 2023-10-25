import React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link';

const Login = () => {
  return (
    <div className='flex flex-col justify-center space-y-10 items-center mx-auto min-h-screen'>
        <a onClick={signIn} className='text-2xl p-2 cursor-pointer text-center rounded-md bg-emerald-500 text-white'>
          <div className='items-center justify-center p-2 rounded-md'>   
              <p>Sign in with Social media</p>
              <p>(Facebook, Github, Google)</p>
              <p>or</p>
              <p>as Jack (anonymous)</p> 
          </div>
        </a>
        <Link href={{
            pathname: "/",
            }} >
          <div className='h-14 w-56 mb-2 justify-center text-center text-white text-bold text-xl bg-gray-700 rounded-lg p-4'>
            <div>
                Back to Homepage
            </div>
          </div>
      </Link>
    </div>
  );
};

export default Login