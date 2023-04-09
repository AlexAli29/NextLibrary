import { getAllBooksAdmin } from "../../../../db/dbOperations";


const getBooks = async (req, res) => {
  if (req.method == "GET") {
    try {

      const data = await getAllBooksAdmin();

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
};
export default getBooks;