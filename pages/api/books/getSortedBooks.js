import { getSearchedBooks } from '../../../db/dbOperations'


const getSortedBooks = async (req, res) => {
  if (req.method == "GET") {
    try {

      const { searchString, year, price } = req.query;

      const data = await getSearchedBooks(searchString, year, price);

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
export default getSortedBooks;