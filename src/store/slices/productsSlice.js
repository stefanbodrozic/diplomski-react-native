import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const initialState = {
  products: {},
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async (storeName = "df300261-e29c-4eb4-8418-19f923a7e2ea") => {
    try {
      let products = [];

      const q = query(
        collection(db, "products"),
        where("storeId", "==", storeName)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("doc", doc.data());
      });

      return products;
    } catch (error) {
      return error.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log("products slice data", action.payload);

        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProducts = (state) => state.products;
export const getProductsStatus = (state) => state.products.status;

export default productsSlice.reducer;
