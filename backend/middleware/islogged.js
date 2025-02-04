const jwt = require("jsonwebtoken");
const JWT_SECRET = "arjunisagoodboy";

const fetchUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json("authentication error");
  }
};
module.exports = fetchUser;
