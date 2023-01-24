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
import { async } from "@firebase/util";
import { useDispatch } from "react-redux";

const initialState = {
  stores: [],
  status: "idle",
  error: null,
};

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  try {
    const dispatch = useDispatch();
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
    if (stores.length > 0) {
      let storesWithProducts = [];

      stores.forEach(async (store) => {
        dispatch(fetchProductsForStore(store));

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

    return stores;
  } catch (error) {
    return error.message;
  }
});

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

      .addCase(fetchProductsForStore.pending, (state, action) => {
        console.log("fetch products PENDING..", action.payload);
      })
      .addCase(fetchProductsForStore.fulfilled, (state, action) => {
        console.log("fetch products fullfiled..", action.payload);
      })
      .addCase(fetchProductsForStore.rejected, (state, action) => {
        console.log("fetch products REJECTED..", action.payload);
      });
  },
});

export const getStores = (state) => state.stores.stores;
export const getStoresStatus = (state) => state.stores.status;
export const getStoresError = (state) => state.stores.error;

export default storesSlice.reducer;
