import { Fragment , useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import DialogBox from './DialogBox';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownMenuPost({postId}) {
    var message = "Post was deleted sucessfully. You will now be redirected to homepage"
    var messageHead = "Post deleted sucessfully!"
    const DELETE_API_ENDPOINT =`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const [modalOpen, setModalOpen] = useState(false);
    const handleSucces = () => {
      Router.push('/')
    }
    const deletePost = (e) => {
        e.preventDefault();
        axios.delete(DELETE_API_ENDPOINT,{
            headers:{
              Accept:"application/json" 
            },})
            .then((response)=>{
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              setModalOpen(true);
            })
            .catch((error)=>{
              console.log(error);
            })
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white pl-2 pr-3 py-2 text-sm font-semibold text-gray-900 shadow-smhover:bg-gray-50">
         
          <FiMoreHorizontal className="-mr-1 h-5 w-5 text-gray-800" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                 <Link href={{
                    pathname: `/posts/edit/[postId]`,
                    query: { postId: postId},
                    }} 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                > Edit
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <p onClick={deletePost}
                  className={classNames(
                    active ? 'bg-red-400 text-white' : 'text-gray-700',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                >
                  Delete
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
      {modalOpen &&(<DialogBox messageHead={messageHead} message={message} handleSucces={handleSucces}/>)}
    </Menu>
  )
}