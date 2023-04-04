
export default async function getSortedBooks(searchString, year, price) {
  const res = await fetch(`http://localhost:3000/api/books/getSortedBooks?searchString=${searchString}&year=${year}&price=${price}`, { cache: 'no-store' });

  if (!res.ok) throw new Error('failed to fetch data')

  return res.json();
}
