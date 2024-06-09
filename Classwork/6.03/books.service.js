import { storageService } from "./aysnc-storage.service.js";
import { DUMMY_BOOKS } from "./constants.js";
export const booksService = { getBooks, getLocalBooks, deleteBook, addBook };

const STORAGE_KEY = "bookDB";
let gBooks = [];

function getLocalBooks() {
  return gBooks;
}

async function getBooks() {
  gBooks = await storageService.get(STORAGE_KEY);
  if (gBooks.length === 0) {
    await storageService.postMany(STORAGE_KEY, DUMMY_BOOKS);
    gBooks = await storageService.get(STORAGE_KEY);
  }
  return gBooks;
}

async function deleteBook(bookID) {
  await storageService.remove(STORAGE_KEY, bookID);
  gBooks = gBooks.filter((book) => book._id !== bookID);
}

async function addBook(book) {
  await storageService.post(STORAGE_KEY, book);
  gBooks.push(book);
}
