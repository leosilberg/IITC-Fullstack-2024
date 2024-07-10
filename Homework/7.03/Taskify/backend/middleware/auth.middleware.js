const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  try {
    const authHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      console.log(`auth.middleware: no token provided`);
      return res.status(401).json("Access denied");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(`auth.middleware: could not verify token`, error.message);
    res.status(401).json("Invalid token");
  }
}

module.exports = {
  verifyToken,
};
