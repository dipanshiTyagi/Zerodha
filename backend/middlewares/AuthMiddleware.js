const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
      }

      const user = await User.findById(data.id);
      if (user) {
        req.user = { id: user._id, username: user.username }; // Attach user info to the request
        next(); // Pass control to the next middleware/route handler
      } else {
        return res.status(404).json({ status: false, message: "User not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = { userVerification };
