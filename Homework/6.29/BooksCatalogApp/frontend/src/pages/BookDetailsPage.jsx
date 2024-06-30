import { useParams } from "react-router-dom";
import { useBooksContext } from "../contexts/BooksContext.jsx";
import { useEffect, useMemo } from "react";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { getBookById } = useBooksContext();

  const book = getBookById(id);
  return (
    <>
      <p>{book?.title}</p>
      <p>{book?.author}</p>
      <p>{book?.genre}</p>
      <p>{book?.description}</p>
    </>
  );
}
