import axios from "axios";
const PRODUCTS_URL = "http://localhost:3000/api/products/";
function loadProducts(filters,signal) {
  const params = new URLSearchParams(filters)
  return axios.get(PRODUCTS_URL+ "?"+params.toString(), {
    signal: signal,
  });
}
function loadProduct(id, signal) {
  return axios.get(PRODUCTS_URL + id, {
    signal: signal,
  });
}


export const ProductsService = {
  loadProducts,
  loadProduct,
};
