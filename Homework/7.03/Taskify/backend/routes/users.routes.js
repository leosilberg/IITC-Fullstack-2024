const express = require("express");
const { getUser } = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/details", getUser);
module.exports = router;
