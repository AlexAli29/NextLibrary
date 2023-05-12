import { addBook } from "../../../../db/dbOperations";
import { updateBook } from "../../../../db/dbOperations";


const Orders = async (req, res) => {

  if (req.method == "GET") {
    try {




      return res.status(200).json();
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "POST") {
    try {




      return res.status(200).json();
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }

  if (req.method == "PATCH") {

    try {




      return res.status(200).json();
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err: err.message });
    }
  }
};
export default Orders;