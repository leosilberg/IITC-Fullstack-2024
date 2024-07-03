const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(`auth.middleware: `,error);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyToken };
