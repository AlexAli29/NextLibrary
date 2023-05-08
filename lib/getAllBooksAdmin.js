
export default async function getAllBooksAdmin() {
  const res = await fetch('http://localhost:3000/api/admin/book', { cache: 'no-store' });

  if (!res.ok) throw new Error('failed to fetch data')

  return res.json();
}
