const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const authRoutes = require("./routes/auth.routes.js");
const { verifyToken } = require("./middleware/auth.middleware.js");
const tasksRoutes = require("./routes/tasks.routes.js");
const usersRoutes = require("./routes/users.routes.js");

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();

  app.use(express.json());
  app.use(cors());
  app.use("/api/tasks",verifyToken,tasksRoutes)
  app.use("/api/auth", authRoutes);
  app.use("/api/user",verifyToken,usersRoutes)
  app.listen(PORT, () => {
    console.log(`index: Server listening on`, PORT);
  });
}

main();
