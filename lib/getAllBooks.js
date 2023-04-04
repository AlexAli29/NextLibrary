
export default async function getAllBooks() {
  const res = await fetch('http://localhost:3000/api/books/getbooks', { cache: 'no-store' });

  if (!res.ok) throw new Error('failed to fetch data')

  return res.json();
}
