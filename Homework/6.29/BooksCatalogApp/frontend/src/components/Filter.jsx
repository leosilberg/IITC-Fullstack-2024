import { useSearchParams } from "react-router-dom";
import { useBooksContext } from "../contexts/BooksContext.jsx";
import { useEffect } from "react";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setFilter } = useBooksContext();
  useEffect(() => {
    setFilter(searchParams.get("genre"));
  }, [searchParams]);
  return (
    <>
      <input
        defaultValue={searchParams.get("genre")}
        onChange={(event) => {
          setSearchParams({ genre: event.target.value });
        }}
      />
    </>
  );
}
