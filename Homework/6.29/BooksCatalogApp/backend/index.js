const connectDB = require("./config/db.js");
const booksRoutes = require("./routes/books.route.js");

const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");

async function main() {
  await connectDB();
  app.use(express.json());
  app.use(cors());
  app.use("/api/books", booksRoutes);
  app.listen(PORT, () => {
    console.log(`index server started on ${PORT}`);
  });
}
main();
