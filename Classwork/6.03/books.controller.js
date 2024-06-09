import { booksService } from "./books.service.js";
window.onload = onInit;

function onInit() {
  window.onDeleteBook = onDeleteBook;
  window.onAddBook = onAddBook;
  onGetBooks();
}

function renderBooks(books) {
  const elemList = document.querySelector("#bookList");
  elemList.innerHTML = books
    .map((book) => {
      return `
          <li> 
          <p>${book.name}</p>
          <button onclick="onDeleteBook('${book._id}')">Delete</button>
          </li>
          `;
    })
    .join("");
}

async function onGetBooks() {
  await booksService.getBooks();
  const books = booksService.getLocalBooks();
  renderBooks(books);
}

async function onDeleteBook(bookID) {
  await booksService.deleteBook(bookID);
  const books = booksService.getLocalBooks();
  renderBooks(books);
}

async function onAddBook() {
  await booksService.addBook({ name: "d", author: "e" });
  const books = booksService.getLocalBooks();
  renderBooks(books);
}
