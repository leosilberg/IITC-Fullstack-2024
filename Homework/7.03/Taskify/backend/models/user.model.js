const mongoose = require("mongoose");
mongoose.ObjectId.get(v => v.toString());
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: false, getters: true } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
