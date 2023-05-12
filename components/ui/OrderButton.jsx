'use client'
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react'


export const OrderButton = ({ bookId }) => {

  const router = useRouter();
  const user = useUser();

  function clickHandler(e) {
    if (!user.roleName) {
      router.push('/login')
    }
    console.log(bookId)
    e.preventDefault();
  }

  return (
    <>{
      user.roleName === 'Admin' ?
        null : (<>
          <button onClick={clickHandler} className='absolute text-white active:scale-95 hover:bg-orange-400 bottom-3 left-3 bg-orange-300 px-[.4rem] rounded-md'>
            Order
          </button>
        </>)
    }</>
  )
}
