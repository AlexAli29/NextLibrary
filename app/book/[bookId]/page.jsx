'use client'
import Image from 'next/image';
import BookImage from '../../../public/book.jpg';
import getAllBooks from '@/lib/getAllBooks';
import { useState } from 'react';
import ReactStars from 'react-stars';

export const metadata = {
  title: 'login',
};


export default function BookPage({ params }) {

  const { bookId } = params;

  const [bookRating, setBookRating] = useState();

  const ratingChanged = (newRating) => {
    setBookRating(newRating)
  };




  return (
    <>
      <div className='w-[80vw] flex justify-center space-x-16  top-4 left-[50%] translate-x-[-50%] relative  shadow-2xl rounded-2xl'>
        <div className='flex flex-col items-center'>

          <Image className='w-[20rem]' src={BookImage} objectFit='contain' />

        </div>
        <div className='flex flex-col'>
          <p className='text-3xl font-semibold w-[560px]'>Sapiens. Краткая история человечества {bookId} </p>
          <div>
            <p className='pt-4'>Юваль Харари, 2016</p>
          </div>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700" />
          <div className='py-5'>
            <button className='bg-rose-400 text-white tracking-wider text-lg w-24 h-9 rounded-lg hover:scale-105 active:scale-95 transition-all ease-in-out'>Order</button>
          </div>
          <div className='mt-3'>
            <p className='text-lg font-medium'>Описание</p>
            <p className='w-[35rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, dolorem magni? Omnis nisi voluptas, sequi in quam dolorum aliquid? Laborum corrupti perspiciatis modi mollitia fugiat qui nisi beatae nihil omnis.  </p>
          </div>
        </div>

      </div>
    </>
  )
}

