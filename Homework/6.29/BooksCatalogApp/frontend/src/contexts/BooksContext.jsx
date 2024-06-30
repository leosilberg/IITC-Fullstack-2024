import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { booksService } from "../services/books.service.js";

export const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(null);
  const [filter, setFilter] = useState("");

  const filteredBooks = useMemo(() => {
    return books?.filter((book) =>
      book.genre.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [books, filter]);

  function getBookById(id) {
    return books?.find((book) => book._id === id);
  }
  useEffect(() => {
    const abortController = new AbortController();
    async function loadBooks() {
      try {
        const { data } = await booksService.getAllBooks(abortController.signal);
        console.log(`BooksContext: `, data);
        setBooks(data);
      } catch (error) {}
    }
    loadBooks();
    return () => abortController.abort();
  }, []);

  return (
    <BooksContext.Provider value={{ filteredBooks, setFilter, getBookById }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  const context = useContext(BooksContext);
  if (context === null) {
    console.log(`BooksContext: use inside `);
    throw new Error("Use inside BooksProvider");
  }
  return context;
}
