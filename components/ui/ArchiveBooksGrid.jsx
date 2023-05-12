'use client'
import React from 'react'
import Link from "next/link";
import { BookCart } from "@/components/BookCart";
import { useArchive } from '@/hooks/useArchive';

export default function ArchiveBooksGrid() {
  const archive = useArchive();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1550px]:grid-cols-6 gap-y-6 pt-4 py-1 px-1 justify-items-center items-center lg:px-20 " >
        {
          archive.map(book => {
            return (
              <Link key={book.bookId} href={`/book/${book.bookId}`}>
                < BookCart key={book.bookId} book={book} />
              </Link>);
          })
        }
      </div>
    </>
  );
}
