

import BookInfo from '@/components/BookInfo';

export async function generateMetadata({ params }) {
  const { bookId } = params;

  const res = await fetch(`http://localhost:3000/api/books/${bookId}`, { cache: 'no-store' });
  const { data } = await res.json();
  return {
    title: data[0].bookName
  }
}

export default async function BookPage({ params }) {

  const { bookId } = params;

  const res = await fetch(`http://localhost:3000/api/books/${bookId}`, { cache: 'no-store' });
  const { data } = await res.json();



  return (
    <BookInfo book={data[0]} />
  )

}

