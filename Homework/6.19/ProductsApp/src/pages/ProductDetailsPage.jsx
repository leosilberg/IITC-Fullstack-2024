import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { ProductsService } from "../services/products.service.js";
import { UserService } from "../services/user.service.js";
import { useUserContext } from "../contexts/UserContext.jsx";

export async function editProductAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { productId } = params;
  let snackbar;
  try {
    snackbar = await UserService.editProduct(productId, data);
  } catch (error) {
    snackbar = error;
  } finally {
    return snackbar;
  }
}
export async function productLoader({ params }) {
  const abortController = new AbortController();
  const productId = params.productId;
  try {
    console.log(`Load product ${productId}`);
    const { data } = await ProductsService.loadProduct(
      productId,
      abortController.signal,
    );
    console.log(`Finished load product ${productId}`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default function ProductDetailsPage() {
  const { user } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const product = useLoaderData();
  const snackbar = useActionData();

  useEffect(() => {
    console.log(product);
  }, [product]);

  useEffect(() => {
    console.log(snackbar);
    snackbar?.severity === "success" && setEditMode(false);
  }, [snackbar]);

  async function deleteProduct() {
    try {
      const result = await UserService.deleteProduct(product._id);
      console.log(result);
      navigate("..");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg px-8 py-8 shadow-lg">
      <img
        src="https://placehold.co/500x300"
        alt=""
        className="object-contain"
      />
      {editMode ? (
        <Form method="post" className="flex flex-col gap-4">
          <input
            className="rounded-lg border border-[#cccccc] bg-[#ffffff] px-3 py-3 text-lg font-bold text-[#444444] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
            type="text"
            name="name"
            defaultValue={product.name}
            placeholder="Name"
          ></input>
          <input
            type="text"
            name="price"
            defaultValue={product.price}
            placeholder="Price"
            className="rounded-lg border border-[#cccccc] bg-[#ffffff] px-3 py-3 text-lg font-bold text-[#444444] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
          />
          <input
            type="text"
            name="quantity"
            defaultValue={product.quantity}
            placeholder="Quantity"
            className="rounded-lg border border-[#cccccc] bg-[#ffffff] px-3 py-3 text-lg font-bold text-[#444444] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
          />
          <input
            type="text"
            name="category"
            defaultValue={product.category}
            placeholder="Category"
            className="rounded-lg border border-[#cccccc] bg-[#ffffff] px-3 py-3 text-lg font-bold text-[#444444] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
          />
          <button
            type="submit"
            className="h-16 rounded-lg bg-[#63ADF2] text-lg font-bold text-[#ffffff] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#304D6D]"
          >
            Save
          </button>
          {snackbar?.severity === "error" && (
            <p className="text-red-700">{snackbar?.message} </p>
          )}
        </Form>
      ) : (
        <>
          <p className="text-5xl font-bold">{product.name}</p>
          <p className="text-2xl">{product.price}</p>
          <p className="text-2xl">{product.quantity}</p>
          <p className="text-2xl">{product.category}</p>

          {user?._id === product.user && (
            <div className="flex flex-wrap justify-center gap-8">
              <button
                className="h-16 w-56 rounded-lg bg-[#d01b1b] text-lg font-bold text-[#ffffff]"
                onClick={deleteProduct}
              >
                Delete
              </button>
              <button
                className="h-16 w-56 rounded-lg bg-[#304d6d] text-lg font-bold text-[#ffffff]"
                onClick={setEditMode}
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
