import axios from "axios";

const BOOK_URL = "http://localhost:3000/api/books/";
async function getAllBooks(signal) {
  try {
    const { data } = await axios.get(BOOK_URL, { signal });
    return { result: "success", data };
  } catch (error) {
    console.log(`books.service: `, error);
    throw { result: "error", message: error.message };
  }
}

async function getBook(bookId) {}

export const booksService = {
  getAllBooks,
  getBook,
};
