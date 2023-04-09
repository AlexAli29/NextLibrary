const jwt = require("jsonwebtoken");
import { getUserByName, setRefreshToken, deleteRefreshToken } from "../../../db/dbOperations";
import { getCookie, deleteCookie } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function logout(req, res) {
  if (req.method == "GET") {
    try {
      // const refreshToken_cookie = getCookie("refresh-token", {
      //   req,
      //   res,
      //   httpOnly: true,
      // });
      // if (!refreshToken_cookie) return res.json({ status: 401 });
      // jwt.verify(
      //   refreshToken_cookie,
      //   process.env.REFRESH_TOKEN_SECRET,
      //   async (err, decode) => {
      //     if (err) return res.status(403).end;
      //     const userId = decode.userId;
      //     await deleteRefreshToken(userId);
      //     deleteCookie("refresh-token", { req, res });
      //   })

      deleteCookie("refresh-token", { req, res });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
