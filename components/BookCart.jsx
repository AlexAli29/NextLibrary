import React from 'react'
import Book from '../public/book.jpg';
import Image from 'next/image';
import { OrderButton } from './ui/OrderButton';
import BookCartRating from './ui/BookCartRating';
import { ArchiveButton } from './ui/ArchiveButton';
import EditButton from './ui/EditButton';



export const BookCart = ({ book }) => {



  return (
    <>
      <div className=' relative p-1  flex items-center flex-col  h-[22rem] w-[10rem]  sm:h-[31rem] sm:w-[14rem] md:h-[31rem] md:w-[14rem] lg:h-[30rem] lg:w-[15rem] rounded-md hover:scale-105 ease-in-out transition-all hover:shadow'>

        <Image className='h-[14rem] w-[10rem]  sm:h-[22rem] sm:w-[14rem] md:h-[22rem] md:w-[14rem] lg:h-[22rem] lg:w-[15rem]' cover='true' src={book.bookImage ? book.bookImage : Book} alt={Book} width={200} height={200} />

        <p className='absolute bottom-[4.8rem] left-3 opacity-80 font-normal text-sm'>
          {book.bookName}
        </p>

        <p className='absolute text-[.78rem] text-red-800 left-3  bottom-14  sm:left-4'>
          {book.bookAuthor}, {book.bookYear}
        </p>
        <BookCartRating book={book} />
        <p className='absolute right-4 bottom-3 text-[.9rem]'>
          {book.bookPrice} <span className='font-semibold'>USD</span>
        </p>
        <OrderButton bookId={book.bookId} />
        <ArchiveButton bookId={book.bookId} />
        <EditButton book={book} />
      </div>
    </>
  )
}
