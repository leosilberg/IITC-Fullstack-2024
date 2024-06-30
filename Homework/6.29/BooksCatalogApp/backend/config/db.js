const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`db: MongoDB connected`,);
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
}
module.exports = connectDB;
