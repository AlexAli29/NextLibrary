'use client'
import { useUser } from '@/hooks/useUser';
import { useAddOrderMutation } from '@/services/api/handleReqApiSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import {
  useToast
} from '@chakra-ui/react'


export const OrderButton = ({ bookId }) => {
  const router = useRouter();
  const user = useUser();
  const [addOrder] = useAddOrderMutation();
  const toast = useToast();
  async function clickHandler(e) {
    e.preventDefault()
    if (!user.roleName) {
      router.push('/login')
      return
    }
    const response = await addOrder({ bookId })
    if (response.error) {
      toast({
        title: `${response.error.data.message}`,
        status: 'error',
        duration: 1500,
        isClosable: true,
        position: 'bottom'
      })
    }
    else {
      toast({
        title: `Book ordered`,
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: 'bottom'
      })
    }
  }

  return (
    <>
      {user.roleName !== 'Admin' && (
        <button
          onClick={clickHandler}
          className="absolute text-white active:scale-95 hover:bg-orange-400 bottom-3 left-3 bg-orange-300 px-[.4rem] rounded-md"
        >
          Order
        </button>
      )}
    </>
  )
}