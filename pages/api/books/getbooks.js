import { getAllBooks } from "../../../db/dbOperations";


const getBooks = async (req, res) => {
  if (req.method == "GET") {
    try {

      const data = await getAllBooks();

      return res.json({ status: 200, data });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};
export default getBooks;