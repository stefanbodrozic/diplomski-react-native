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
  products: [],
  productsStatus: "idle",
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
    });

    let storesWithProducts = [];
    /* 
    if (stores.length > 0) {
      let storesWithProducts = [];

      stores.forEach(async (store) => {
        // dispatch(fetchProductsForStore(store));
        // jedno od ova dva treba napraviti da radi
        // const productsQuery = query(
        //   collection(db, "products", store.storeName, "products")
        //   // where("storeId", "==", id)
        // );
        // const productsSnapshot = await getDocs(productsQuery);
        // productsSnapshot.forEach((doc) => {
        //   let singleStore = { ...store };
        //   singleStore.products = doc.data();
        //   storesWithProducts.push(singleStore);
        // });
        // console.log(storesWithProducts);
      });
    }
    */

    return stores;
  } catch (error) {
    return error.message;
  }
});

export const fetchProducts = createAsyncThunk(
  "stores/fetchProducts", // for single store
  async (storeId, storeName) => {
    try {
      let products = [];

      const productsQuery = query(
        collection(db, "products", "Prodavnica 01", "products")
        // where("storeId", ==, "id")
      );

      const productsSnapshot = await getDocs(productsQuery);
      productsSnapshot.forEach((doc) => {
        const { id, name, price } = doc.data();
        const product = { id, name, price };
        products.push(product);
      });

      console.log("store with products..", products);
      return products;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchProductsForStore = createAsyncThunk(
  "stores/fetchProductsForStore",
  async (store) => {
    try {
      let storeWithProducts = { ...store };
      console.log("fetch products for store ...store => ", storeWithProducts);
      const productsQuery = query(
        collection(db, "products", store.storeName, "products")
        // where("storeId", ==, "id")
      );

      const productsSnapshot = await getDocs(productsQuery);
      productsSnapshot.forEach((doc) => {
        storeWithProducts.products = doc.data();
      });

      console.log("store with products..", storeWithProducts);
      return storeWithProducts;
    } catch (error) {
      return error.message;
    }
  }
);

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
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchProducts.pending, (state, action) => {
        state.productsStatus = "loading";

        console.log("fetch products PENDING..", action.payload);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.error = action.error.message;
      });

    // .addCase(fetchProductsForStore.pending, (state, action) => {
    //   console.log("fetch products PENDING..", action.payload);
    // })
    // .addCase(fetchProductsForStore.fulfilled, (state, action) => {
    //   console.log("fetch products fullfiled..", action.payload);
    // })
    // .addCase(fetchProductsForStore.rejected, (state, action) => {
    //   console.log("fetch products REJECTED..", action.payload);
    // });
  },
});

export const getStores = (state) => state.stores.stores;
export const getStoresStatus = (state) => state.stores.status;
export const getStoresError = (state) => state.stores.error;

export const getStoreProducts = (state) => state.stores.products;
export const getStoreProductsStatus = (state) => state.stores.productsStatus;

export default storesSlice.reducer;
