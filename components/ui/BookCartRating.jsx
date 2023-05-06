'use client'

import { useState } from "react";
import ReactStars from "react-stars";

export default function BookCartRating({ book }) {

  const [bookRating, setBookRating] = useState(book.bookRating);
  const [bookRatesAmount, setBookRatesAmount] = useState(book.bookRatesAmount)

  const ratingChanged = (newRating) => {
    setBookRating(newRating);
    setBookRatesAmount(prev => prev + 1);
  };



  return (
    <span onClick={(e) => e.preventDefault()} className='flex items-center text-xs absolute bottom-10 left-3'> <ReactStars
      count={5}
      onChange={ratingChanged}
      size={14}
      value={bookRating}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700" />
      <span className='pl-1 text-slate-500'>
        {bookRating}
        <span className='pl-1 text-blue-900'>({bookRatesAmount})</span>
      </span>
    </span>
  )
}
