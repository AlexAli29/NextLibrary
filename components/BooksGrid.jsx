import React from 'react'
import Link from "next/link";
import { BookCart } from "@/components/BookCart";

export default async function BooksGrid({ data = [] }) {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1550px]:grid-cols-6 gap-y-6  py-7 px-1 justify-items-center items-center lg:px-20 " >
      {
        data.map(book => {
          return (
            <Link href={`/book/${book.bookId}`}>
              < BookCart key={book.bookId} book={book} />
            </Link>);
        })
      }
    </div>
  );
}
