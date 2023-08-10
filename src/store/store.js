import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import stores from "./slices/stores";
import cart from "./slices/cart";
import user from "./slices/user";

export const store = configureStore({
  reducer: {
    categories,
    stores,
    cart,
    user,
  },
});
