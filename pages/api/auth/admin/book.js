import { addBook } from "../../../../db/dbOperations";
import { getAllBooksAdmin, updateBook } from "../../../../db/dbOperations";


const AdminBooks = async (req, res) => {

  if (req.method == "POST") {
    try {


      const { bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId } = req.body;

      const BookId = await addBook({ bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId });

      return res.status(200).json(BookId);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "PATCH") {

    try {


      const { bookId, bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId } = req.body;
      console.log('im here')
      const BookId = await updateBook({ bookId, bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId });

      return res.status(200).json(BookId);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "GET") {
    try {

      const data = await getAllBooksAdmin();

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
};
export default AdminBooks;