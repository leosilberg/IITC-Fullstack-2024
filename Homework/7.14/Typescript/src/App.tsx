import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { addTodoAction } from "./components/CreateTodo.tsx";
import { deleteTodoAction, toggleTodoAction } from "./components/TodoCard.tsx";
import TodoDetails, {
  todoLoader,
  updateTodoAction,
} from "./pages/TodoDetails.tsx";
import TodoList, { todosLoader } from "./pages/TodoList.tsx";

interface AppProps {}

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
    loader: todosLoader,
  },
  {
    path: "/:todoId",
    element: <TodoDetails />,
    loader: todoLoader,
    children: [
      {
        path: "delete",
        action: deleteTodoAction,
      },
      {
        path: "toggle",
        action: toggleTodoAction,
      },
      {
        path: "update",
        action: updateTodoAction,
      },
    ],
  },
  {
    path: "/create",
    action: addTodoAction,
  },
]);
export default function App({}: AppProps) {
  return (
    <div className="px-12 py-8">
      <RouterProvider router={router} />
    </div>
  );
}
