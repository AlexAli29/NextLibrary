const jwt = require("jsonwebtoken");
import { getUserByName, setRefreshToken, deleteRefreshToken } from "../../../db/dbOperations";
import { setCookie } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function login(req, res) {
  if (req.method == "POST") {
    try {

      const username = req.body.userName;
      const password = req.body.password;
      console.log('fhfhfhfh')

      const [{ userId,
        userName,
        userEmail,
        userImage,
        passwordHash,
        roleName }] = await getUserByName(username);


      const isVerifid = await bcrypt.compare(password, passwordHash);

      if (!isVerifid) return res.status(403).end();

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

      return res.json({ status: 200, accessToken });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
}
