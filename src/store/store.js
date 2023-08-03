import { configureStore } from "@reduxjs/toolkit";
import categories from "./slices/categories";

export const store = configureStore({
  reducer: {
    categories,
  },
});
