'use client'
import React, { useState } from 'react'
import UserIcon from './UserIcon'
import ClickAwayListener from 'react-click-away-listener'
import Link from 'next/link';
import { useLogoutMutation } from '@/services/api/handleReqApiSlice';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';

export default function UserDropDown({ user }) {

  const router = useRouter();
  const toast = useToast();
  const { logOut, removeUserData } = useActions();
  const [dropDownActive, setDropDownActive] = useState(false);
  const [logout] = useLogoutMutation();

  const handleClickAway = () => {
    setDropDownActive(false);
  }

  const handleClick = () => {
    setDropDownActive(true)
  }

  const handleLogout = async () => {
    await logout();
    logOut();
    removeUserData();
    toast({
      title: `Logged out`,
      status: 'error',
      duration: 1000,
      isClosable: true,
      position: 'bottom'
    })
    router.push('/');
  }

  return (
    <>
      <  UserIcon onPress={handleClick} />
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={`absolute z-50 bg-[rgba(211,173,92,0.18)] ${dropDownActive ? 'flex' : 'hidden'}  rounded-lg backdrop-blur-[10px] w-[10rem] h-[8rem] pt-2 flex flex-row justify-center  right-[.4rem] shadow-lg`}>
          <ul className='flex flex-col items-center space-y-3 font-montserrat text-rose-800' >
            <li className='font-semibold text-lg'>{user.userName}</li>
            <Link href='/user-page'><li className='flex items-center'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-5 h-[1.2rem] mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
              Your profile</li></Link>
            <li onClick={handleLogout} className='flex cursor-pointer items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-5 h-[1.2rem] mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
              Log out
            </li>
          </ul>
        </div>
      </ClickAwayListener>

    </>
  )
}
