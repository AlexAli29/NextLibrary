const jwt = require("jsonwebtoken");
import { deleteCookie } from "cookies-next";
const bcrypt = require("bcrypt");

export default async function logout(req, res) {
  if (req.method == "GET") {
    try {
      deleteCookie("refresh-token", { req, res });
      return res.status(200).json({});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
