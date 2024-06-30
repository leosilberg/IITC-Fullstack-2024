import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { BooksProvider } from "./contexts/BooksContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/book/:id",
    element: <BookDetailsPage />,
  },
]);
export default function App() {
  return (
    <>
      <BooksProvider>
        <RouterProvider router={router} />
      </BooksProvider>
    </>
  );
}
