const {
  getBookByID,
  getBooks,
  createBook,
} = require("../controller/books.controller.js");

const express = require("express");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookByID);
router.post("/", createBook);
module.exports = router;
