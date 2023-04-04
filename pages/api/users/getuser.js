import { getUserById } from '../../../db/dbOperations'
const jwt = require('jsonwebtoken');


export default async function getUser(req, res) {
  if (req.method == "POST") {
    try {

      const authHeader = req.headers["authorization"];



      const accessToken = authHeader.split(" ")[1];

      const decodedToken = jwt.decode(accessToken);

      const { userId } = decodedToken;

      const [userData] = await getUserById(userId);


      return res.json({ status: 200, userData });
    } catch (err) {
      return res.json({ status: 500, msg: err });
    }
  }
};

