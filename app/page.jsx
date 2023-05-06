
import BooksGrid from "@/components/BooksGrid";
import getAllBooks from "@/lib/getAllBooks";
import getSortedBooks from "@/lib/getSortedBooks";



export const metadata = {
  content: "width=device-width, initial-scale=1",
  title: 'Home',
  description: 'Welcome to Next.js',
  charset: 'utf-8'

};




export default async function Home({ searchParams }) {

  if (Object.keys(searchParams).length === 0) {
    const { data } = await getAllBooks();

    return <BooksGrid data={data} />;

  }
  else {
    const { searchString, year, price } = searchParams
    const decodedString = decodeURIComponent(searchString)
    const { data } = await getSortedBooks(decodedString, year, price);

    return <BooksGrid data={data} />;
  }



  // const { searchString, year, price } = searchParams

  // const decodedString = decodeURIComponent(searchString)

  // const { data } = await getAllBooks();
  // console.log('khkh  ' + searchString)

  // return (

  //   <BooksGrid data={data} />


  // );
}


