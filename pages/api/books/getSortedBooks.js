import { getSearchedBooks } from '../../../db/dbOperations'


const getSortedBooks = async (req, res) => {
  if (req.method == "GET") {
    try {

      const { searchString, year, price } = req.query;

      const data = await getSearchedBooks(searchString, year, price);

      return res.json({ status: 200, data });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};
export default getSortedBooks;