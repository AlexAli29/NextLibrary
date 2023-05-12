
import { getArchivedBooks, getBookById, archiveBook } from "../../../../db/dbOperations";


const Archive = async (req, res) => {

  if (req.method == "GET") {
    try {

      const data = await getArchivedBooks();

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  if (req.method == "PATCH") {

    try {

      const { bookId } = req.body;

      const data = await getBookById(bookId);
      if (data && data[0].isArchived === 0) {
        await archiveBook(bookId, 1)
      }
      if (data && data[0].isArchived === 1) {
        await archiveBook(bookId, 0)
      }
      return res.status(200).json(data[0].isArchived === 0 ? `${data[0].bookName} archived` : `${data[0].bookName} added to catalog`);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }
};
export default Archive;