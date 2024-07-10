const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`db: DB connected`);
  } catch (error) {
    console.log(`db: `, error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
