import { IProduct } from "@/components/ProductCard.tsx";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICartItem = {
  product: IProduct;
  quantity: number;
};
const initialState: ICartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ product: IProduct }>) => {
      state.push({ product: action.payload.product, quantity: 1 });
    },
    deleteProduct: (state, action: PayloadAction<{ product: IProduct }>) => {
      return state.filter(
        (item) => item.product.name !== action.payload.product.name
      );
    },
    updateProduct: (
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      return state.map((item) =>
        item.product.name === action.payload.product.name
          ? { ...item, quantity: item.quantity + action.payload.quantity }
          : item
      );
    },
    clearCart: (state, action) => {
      return [];
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
