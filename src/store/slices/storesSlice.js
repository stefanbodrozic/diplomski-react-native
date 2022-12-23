import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../../../firebase/firebase-config";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const initialState = {
  stores: [],
  status: "idle",
  error: null,
};

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  try {
    let stores = [];

    const q = query(
      collection(db, "users"),
      orderBy("storeName", "asc")
      //   ,limit(5)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const { id, storeName } = doc.data();

      stores.push({ id, storeName, products: [] });

      //   const productsQuery = query(
      //     collection(db, "products", storeName, "products")
      //     // where("storeId", "==", id)
      //   );

      //   const productsSnapshot = await getDocs(productsQuery);
      //   productsSnapshot.forEach((doc) => {
      //     console.log("product", doc.data());
      //   });

      // pronaci i producte iz store-a
    });

    if (stores.length > 0) {
      console.log(stores);

      stores.forEach(async (store, index) => {
        let products = [];

        const productsQuery = query(
          collection(db, "products", store.storeName, "products")
          // where("storeId", "==", id)
        );

        const productsSnapshot = await getDocs(productsQuery);
        productsSnapshot.forEach((doc) => {
          //   console.log("product", doc.data());
          // update store sa productima

          products.push(doc.data());
        });

        console.log("PRODUCST", products);
        // dodeliti products u store (trenutni) .products
        // store.products = products;
      });
    }

    return stores;
  } catch (error) {
    return error.message;
  }
});

const storesSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStores.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.stauts = "failed";
        state.error = action.error.message;
      });
  },
});

export const getStores = (state) => state.stores.stores;
export const getStoresStatus = (state) => state.stores.status;
export const getStoresError = (state) => state.stores.error;

export default storesSlice.reducer;
