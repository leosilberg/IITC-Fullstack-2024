const Book  = require("../models/book.model.js");
async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(`books.controller: error getting all books`, error);
    res.status(500).json({ message: error.message });
  }
}

async function getBookByID(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(`books.controller: error getting book ${id}`, error);
    res.status(500).json({ message: error.message });
  }
}

async function createBook(req, res) {
  const newBook = Book(req.body);
  try {
    const savedBook = newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.log(`books.controller: error creating book`, error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getBooks, getBookByID, createBook };
