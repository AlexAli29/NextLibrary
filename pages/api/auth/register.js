const jwt = require("jsonwebtoken");
import { addUser, getUserByName, getUserByEmail, setRefreshToken } from '../../../db/dbOperations';
import { setCookie } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function register(req, res) {
  if (req.method === "POST") {
    try {
      const { userName, userEmail, password } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const userByName = await getUserByName(userName);

      const userByEmail = await getUserByEmail(userEmail);


      if (userByName.length) {
        return res.status(409).json({ msg: 'This name is already taken' });
      }
      if (userByEmail.length) {
        return res.status(409).json({ msg: 'This email is already taken' });
      }

      const user = {
        userName: userName,
        userEmail: userEmail,
        passwordHash: passwordHash,
        roleId: 3
      };


      const userId = await addUser(user);


      const refreshToken = jwt.sign(
        { userId: userId },
        process.env.REFRESH_TOKEN_SECRET
      );

      const accessToken = jwt.sign(
        {
          userId: userId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );



      setRefreshToken(userId, refreshToken);
      setCookie('refresh-token', refreshToken, { req, res, httpOnly: 'true', });

      return res.status(200).json({ accessToken });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
