import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../contexts/BooksContext.jsx";
import Filter from "../components/Filter.jsx";

export default function HomePage() {
  const { filteredBooks: books } = useBooksContext();
  const navigate = useNavigate();
  return (
    <>
      <Filter />
      <ul className="grid justify-items-center">
        {books?.map((book) => {
          return (
            <li
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
              className="flex flex-col gap-4 rounded-lg px-8 py-8 shadow-lg"
            >
              <p> {book.title}</p>
              <p>{book.author}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
