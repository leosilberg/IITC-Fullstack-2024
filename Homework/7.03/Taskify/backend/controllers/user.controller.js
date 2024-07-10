const User = require("../models/user.model.js");

async function getUser(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(`user.controller: `, error.message);
    res.status(500).json("Server error getting user");
  }
}

module.exports = {
  getUser,
};
