'use client'
import React from 'react'

export const OrderButton = ({ bookId }) => {

  function clickHandler(e) {
    console.log(bookId)
    e.preventDefault();
  }

  return (
    <button onClick={clickHandler} className='absolute text-white hover:bg-orange-400 bottom-3 left-3 bg-orange-300 px-[.4rem] rounded-md'>
      Order
    </button>
  )
}
