import { getBookById } from "../../../db/dbOperations";


const getBook = async (req, res) => {
  if (req.method == "GET") {
    try {

      const { bookId } = req.query;

      const data = await getBookById(bookId);

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
export default getBook;