import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";
import stores from "./slices/stores";

export const store = configureStore({
  reducer: {
    categories,
    stores,
  },
});
