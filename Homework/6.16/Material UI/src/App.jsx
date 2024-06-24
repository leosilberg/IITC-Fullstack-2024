import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import TodosLayout from "./layouts/TodosLayout.jsx";
import CreateTodoPage, { createAction } from "./pages/CreateTodoPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TodoDetailsPage, { todoLoader } from "./pages/TodoDetailsPage.jsx";
import TodosPage, { todosLoader } from "./pages/TodosPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "todos",
            element: <TodosLayout />,
            children: [
              {
                path: "",
                element: <TodosPage />,
                loader: todosLoader,
                shouldRevalidate: (params) => {
                  return params.nextUrl.pathname === "/todos";
                },
                children: [
                  {
                    path: "create",
                    element: <CreateTodoPage />,
                    action: createAction,
                  },
                ],
              },
              {
                path: ":todoId",
                loader: todoLoader,
                element: <TodoDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
