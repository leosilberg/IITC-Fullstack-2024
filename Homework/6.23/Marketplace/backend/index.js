const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

const productsRoutes = require("./routes/products.route.js");
const authRoutes = require("./routes/auth.routes.js");
const { verifyToken } = require("./middleware/auth.middleware.js");
const userRoutes = require("./routes/user.routes.js");

async function main() {
  await connectDB();
  app.use(express.json());

  app.use(cors({}));

  app.use("/api/products", productsRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", verifyToken, userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
