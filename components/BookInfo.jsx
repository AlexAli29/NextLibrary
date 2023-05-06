'use client'
import Image from 'next/image';
import BookImage from '../public/book.jpg';
import { useState } from 'react';
import ReactStars from 'react-stars';


export default function BookInfo({ book }) {
  const [bookRating, setBookRating] = useState(book.bookRating);
  const [bookRatesAmount, setBookRatesAmount] = useState(book.bookRatesAmount)



  const ratingChanged = (newRating) => {
    setBookRating(newRating)
    setBookRatesAmount(prev => prev + 1)
  };




  return (
    <>
      <div className='w-[80vw] flex justify-center space-x-16  top-4 left-[50%] translate-x-[-50%] relative  shadow-2xl rounded-2xl'>
        <div className='relative flex flex-col items-center w-[23rem] h-[35rem] '>


          <Image className='w-[20rem]' fill src={book.bookImage ? book.bookImage : BookImage} />

        </div>
        <div className='flex flex-col'>
          <p className='text-3xl font-semibold w-[560px]'>{book?.bookName}  </p>
          <div>
            <p className='pt-4'>{book?.bookAuthor}, {book?.bookYear}</p>
          </div>
          <span className='flex items-center'> <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            value={bookRating}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700" />
            <span className='pl-2 text-slate-500'>
              {bookRating}
              <span className='pl-2 text-blue-900'>({bookRatesAmount})</span>
            </span>
          </span>
          <div className='py-5'>
            <button className='bg-rose-400 text-white tracking-wider text-lg w-24 h-9 rounded-lg hover:scale-105 active:scale-95 transition-all ease-in-out'>Order</button>
          </div>
          <div className='mt-3'>
            <p className='text-lg font-medium'>Description</p>
            <p className='w-[35rem]'>{book?.bookDescription}</p>
          </div>
        </div>

      </div>
    </>
  )
}
