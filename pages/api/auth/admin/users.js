import { getAllUsers } from '@/db/dbOperations';

const Users = async (req, res) => {

  if (req.method == "GET") {
    try {

      const data = await getAllUsers();

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
export default Users;