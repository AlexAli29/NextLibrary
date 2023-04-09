import { getAllCategories } from "../../../db/dbOperations";


const getCategories = async (req, res) => {
  if (req.method == "GET") {
    try {

      const data = await getAllCategories();

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
export default getCategories;