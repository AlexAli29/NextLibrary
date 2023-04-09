const jwt = require("jsonwebtoken");
import { getUserByName, setRefreshToken, deleteRefreshToken } from "../../../db/dbOperations";
import { setCookie } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function login(req, res) {
  if (req.method == "POST") {
    try {

      const username = req.body.userName;
      const password = req.body.password;


      const data = await getUserByName(username);

      console.log(JSON.stringify(data))

      if (data.length == 0) {
        return res.status(404).json({ msg: 'User not found' }).end();
      }


      const [{ userId,
        userName,
        userEmail,
        userImage,
        passwordHash,
        roleName }] = data


      const isVerifid = await bcrypt.compare(password, passwordHash);

      if (!isVerifid) return res.status(403).json({ msg: 'Wrong Password' }).end();

      await deleteRefreshToken(userId);

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

      await setRefreshToken(userId, refreshToken);

      setCookie("refresh-token", refreshToken, {
        req,
        res,
        httpOnly: true,

      });

      return res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
