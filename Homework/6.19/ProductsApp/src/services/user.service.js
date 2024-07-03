import axios from "axios";
import { TOKEN_KEY } from "../Consts.js";
const USER_URL = "http://localhost:3000/api/user/";

const authAxios = axios.create({});
authAxios.interceptors.request.use((req) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    req.headers.Authorization = token;
    return req;
  } else {
    throw { severity: "error", message: "No auth token found" };
  }
});

async function getUser() {
  try {
    const { data } = await authAxios.get(USER_URL);
    return { severity: "success", data };
  } catch (error) {
    console.log(`user.service: `, error);
    throw { severity: "error", message: error.message };
  }
}

async function getUserProducts() {
  try {
    const { data } = await authAxios.get(USER_URL + "products");
    return { severity: "success", data };
  } catch (error) {
    console.log(`user.service: `, error);
    throw { severity: "error", message: error.message };
  }
}

async function createProduct(name, price,quantity, category) {
  const newProduct = {
    name,
    price,
    quantity,
    category,
  };
  try {
    await authAxios.post(USER_URL+"products", newProduct);
    return {
      severity: "success",
      message: "New product added",
    };
  } catch (error) {
    console.log(error);
    throw {
      severity: "error",
      message: "Error adding product",
    };
  }
}

async function editProduct(id, changes) {
  try {
    await authAxios.patch(USER_URL+"products/" + id, changes);

    return {
      severity: "success",
      message: "Product title edited",
    };
  } catch (error) {
    console.log(error);
    throw {
      severity: "error",
      message: "Error editing product",
    };
  }
}

async function deleteProduct(id) {
  try {
    await authAxios.delete(USER_URL+"products/"+ id);
    return { severity: "success", message: "Product deleted" };
  } catch (error) {
    console.log(error);
    throw {
      severity: "error",
      message: "Error deleting product",
    };
  }
}
export const UserService = {
  getUser,
  getUserProducts,
  createProduct,
  editProduct,
  deleteProduct
};
