import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart.reducer.ts";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
