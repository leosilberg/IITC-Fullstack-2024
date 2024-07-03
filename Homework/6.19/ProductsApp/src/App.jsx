import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import ProductLayout from "./layouts/ProductLayout.jsx";
import CreateProductPage, {
  createProductAction,
} from "./pages/CreateProductPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductDetailsPage, {
  editProductAction,
  productLoader,
} from "./pages/ProductDetailsPage.jsx";
import ProductsListPage, { productsLoader } from "./pages/ProductsListPage.jsx";
import RegisterPage, { registerAction } from "./pages/RegisterPage.jsx";
import UserProfilePage, {
  userProfileLoader,
} from "./pages/UserProfilePage.jsx";
import ProtectedUserLayout from "./layouts/ProtectedUserLayout.jsx";

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
            path: "products",
            element: <ProductLayout />,
            children: [
              {
                path: "",
                element: <ProductsListPage />,
                loader: productsLoader,
                shouldRevalidate: (params) => {
                  console.log(params);
                  return params.nextUrl.pathname === "/products";
                },
              },
              {
                path: ":productId",
                element: <ProductDetailsPage />,
                loader: productLoader,
                action: editProductAction,
              },
            ],
          },
          {
            path: "user",
            element: <ProtectedUserLayout />,
            children: [
              {
                path: "",
                element: <UserProfilePage />,
                loader: userProfileLoader,
                children: [
                  {
                    path: "create",
                    element: <CreateProductPage />,
                    action: createProductAction,
                  },
                ],
              },
            ],
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
            action: registerAction,
          },
        ],
      },
    ],
  },
]);
export default function App(props) {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}
