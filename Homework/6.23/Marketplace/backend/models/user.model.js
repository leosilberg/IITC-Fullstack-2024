const mongoose = require("mongoose");
mongoose.ObjectId.get(v => v.toString());
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    products: [
      { type: mongoose.ObjectId, ref: "Product", default: [] },
    ],
  },
  { timestamps: true, toJSON: { virtuals: false, getters: true } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
