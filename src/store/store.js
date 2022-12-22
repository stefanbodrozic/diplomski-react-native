import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    categories: categoriesSlice,
    products: productsSlice,
  },
});
