import { addBook } from "../../../../db/dbOperations";


const addBooks = async (req, res) => {

  if (req.method == "POST") {
    try {


      const { bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId } = req.body;

      const BookId = await addBook({ bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId });
      console.log('bookName from add book', bookName)
      return res.status(200).json(BookId);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }
};
export default addBooks;