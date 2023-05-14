import { addUserBook, deleteUserBook, getUserBooks } from "@/db/dbOperations";
const jwt = require('jsonwebtoken');

const UserBooks = async (req, res) => {

  if (req.method == "GET") {
    try {

      const authHeader = req.headers["authorization"];

      const accessToken = authHeader.split(" ")[1];

      const decodedToken = jwt.decode(accessToken);

      const { userId } = decodedToken;
      const books = await getUserBooks(userId);
      return res.status(200).json(books);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "POST") {
    try {
      const { bookId, userId } = req.body
      const authHeader = req.headers["authorization"];

      const accessToken = authHeader.split(" ")[1];

      const decodedToken = jwt.decode(accessToken);

      const { userId: currentUserId } = decodedToken;

      await addUserBook(userId, bookId);


      return res.status(200).json();
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "PATCH") {

    try {

      const { bookId } = req.body
      const authHeader = req.headers["authorization"];

      const accessToken = authHeader.split(" ")[1];

      const decodedToken = jwt.decode(accessToken);

      const { userId } = decodedToken;

      await deleteUserBook(userId, bookId);

      return res.status(200).json();
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }
};
export default UserBooks;