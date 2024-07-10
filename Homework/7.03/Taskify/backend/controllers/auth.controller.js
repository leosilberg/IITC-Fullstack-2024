const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const  {JWT_SECRET}  = process.env;
const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();
    res.status(201).json("User registed succesfully");
  } catch (error) {
    console.log(`auth.controller: `, error.message);
    if (error.code === 11000) {
      return res.status(400).json("User already exists");
    }
    res.status(500).json("Registration failed");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`auth.controller: user not found`);
      return res.status(401).json("Email or password are incorrect");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log(`auth.controller: password incorrect`);
      return res.status(401).json("Email or password are incorrect");
    }

    const { _id } = user.toJSON();

    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json(token);
  } catch (error) {
    console.log(`auth.controller: `, error.message);
    res.status(500).json("Login failed");
  }
}
module.exports = {
  register,
  login,
};
