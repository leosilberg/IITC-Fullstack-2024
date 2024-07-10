import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  createTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from "./actions/TaskActions.js";
import {
  createTodoAction,
  deleteTodoAction,
  updateTodoAction,
} from "./actions/TodoActions.js";
import AppLayout from "./layouts/AppLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage, { contactFormAction } from "./pages/ContactPage.jsx";
import CreateTaskPage from "./pages/CreateTaskPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import TaskDetailsPage, { taskDetailLoader } from "./pages/TaskDetailsPage.jsx";
import TaskListPage, { taskListLoader } from "./pages/TaskListPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "tasks",
        element: <ProtectedLayout />,
        children: [
          {
            path: "",
            element: <TaskListPage />,
            loader: taskListLoader,
            children: [
              {
                path: "create",
                element: <CreateTaskPage />,
                action: createTaskAction,
              },
              {
                path: ":taskId",
                element: <TaskDetailsPage />,
                loader: taskDetailLoader,
                children: [
                  { path: "delete", action: deleteTaskAction },
                  { path: "update", action: updateTaskAction },
                  { path: "todo", action: createTodoAction },
                  {
                    path: "todo/:todoId",
                    children: [
                      { path: "update", action: updateTodoAction },
                      { path: "delete", action: deleteTodoAction },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
        action: contactFormAction,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
