import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Input from "../components/ui/Input.jsx";
import { UserService } from "../services/user.service.js";
import { useUserContext } from "../contexts/UserContext.jsx";

export async function createProductAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let snackbar;
  try {
    snackbar = await UserService.createProduct(
      data.name,
      data.price,
      data.quantity,
      data.category.split(","),
    );
  } catch (error) {
    snackbar = error;
  } finally {
    return snackbar;
  }
}
export default function CreateProductPage() {
  const navigationState = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    navigationState.state === "submitting" && setErrorMessage(null);
  }, [navigationState.state]);

  const navigate = useNavigate();
  const snackbar = useActionData();
  useEffect(() => {
    console.log(snackbar?.message);
    snackbar?.severity === "success"
      ? navigate("/user", {
          replace: true,
          state: { snackbar: snackbar },
        })
      : setErrorMessage(snackbar?.message);
  }, [snackbar]);

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          className="fixed inset-0 z-10 w-screen overflow-y-auto"
          onClick={() => navigate("/user")}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div
                className="bg-white px-4 py-4 sm:p-16"
                onClick={(e) => e.stopPropagation()}
              >
                <Form method="post" className="flex flex-col gap-4">
                  <Input type="text" name="name" placeholder="Name"></Input>
                  <Input type="text" name="price" placeholder="Price" />
                  <Input type="text" name="quantity" placeholder="Quantity" />
                  <Input type="text" name="category" placeholder="Category" />
                  <button
                    type="submit"
                    className="h-16 rounded-lg bg-[#63ADF2] text-lg font-bold text-[#ffffff] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
                  >
                    Create
                  </button>
                  {errorMessage && (
                    <p className="text-red-700">{errorMessage} </p>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
