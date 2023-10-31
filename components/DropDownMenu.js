import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownMenu() {
    const {data: session} = useSession();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white pl-2 pr-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         
          <ChevronDownIcon className="-mr-1 h-6 w-6 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {session != null && (<Menu.Item>
              {({ active }) => (
                <Link
                  href="/userSettings"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item>)}
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/privacyPolicy"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Privacy policy
                </Link>
              )}
            </Menu.Item>
            <form>
              {session?(<Menu.Item>
                {({ active }) => (
                   
                  <button
                    onClick={signOut}
                    type="submit"
                    className={classNames(
                      active ? ' bg-red-400 text-white' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm border-t'
                    )}
                  >
                    Sign out
                  </button>
                
                )}
              </Menu.Item>):
              (<>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/register"
                    className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm border-t')}>
                    Register
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                  href="/sendResetPasswordEmail"
                  className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block w-full px-4 py-2 text-left text-sm border-t')}>
                  Reset Password
                </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={signIn}
                    type="submit"
                    className={classNames(
                      active ? ' bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm border-t'
                    )}
                  >
                    Sign In
                  </button>
                )}
              </Menu.Item>
              </>)}
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}