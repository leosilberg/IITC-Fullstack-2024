const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`auth.controller: user not found`);
      return res.status(401).json({ message: "Auth failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log(`auth.controller: password incorrect`);
      return res.status(401).json({ message: "Auth Failed" });
    }
    const { _id } = user.toJSON();

    const token = jsonwebtoken.sign({ _id }, JWT_SECRET, { expiresIn: "1m" });
    res.status(200).json({ token });
  } catch (error) {
    console.log(`auth.controller: `, error);
    res.status(500).json({ message: "Login Failed" });
  }
}

async function register(req, res) {
  try {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();
    res.status(201).json({ message: "User registed succesfully" });
  } catch (error) {
    console.log(`auth.controller: `, error);
    if (error.code === 11000) {
      console.log("username already exists");
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
}

module.exports = { login, register };
