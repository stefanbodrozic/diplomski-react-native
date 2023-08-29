import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Status } from "../../util";

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  try {
    let stores = [];

    const querySnapshot = await getDocs(collection(db, "stores"));
    querySnapshot.forEach((doc) => {
      const { id, address, storeName, userUid, category } = doc.data();

      stores.push({
        id,
        category,
        docId: doc.id,
        address,
        name: storeName,
        userUid,
        products: [],
      });
    });

    await Promise.all(
      stores.map(async (store) => {
        const querySnapshot = await getDocs(
          collection(db, "stores", store.docId, "products")
        );

        querySnapshot.forEach((doc) => {
          const { id, categoryId, name, description, price, images } =
            doc.data();

          store.products.push({
            id,
            categoryId,
            name,
            description,
            price,
            images,
          });
        });
      })
    );

    return stores;
  } catch (error) {
    console.log(error);
  }
});

export const fetchSingleStore = createAsyncThunk(
  "stores/fetchSingleStore",
  async (user) => {
    try {
      let store = [];

      const q = query(collection(db, "stores"), where("userId", "==", user.id));

      const storeQuerySnapshot = await getDocs(q);

      storeQuerySnapshot.forEach((doc) => {
        const { id, address, storeName, userUid, category } = doc.data();

        store = {
          id,
          category,
          docId: doc.id,
          address,
          name: storeName,
          userUid,
          products: [],
        };
      });

      const querySnapshot = await getDocs(
        collection(db, "stores", user.storeRefId, "products")
      );

      querySnapshot.forEach((doc) => {
        const { id, categoryId, name, description, price, images } = doc.data();
        store.products.push({
          id,
          categoryId,
          name,
          description,
          price,
          images,
        });
      });

      return store;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  allStores: [],
  allStoresStatus: Status.IDLE,

  store: null,
  storeStatus: Status.IDLE,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    resetStores: (state, _action) => {
      state.allStores = [];
      state.allStoresStatus = Status.IDLE;

      state.store = null;
      state.storeStatus = Status.IDLE;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStores.pending, (state, _action) => {
        state.allStoresStatus = Status.PENDING;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.allStoresStatus = Status.FULLFILED;
        state.allStores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, _action) => {
        state.allStoresStatus = Status.FAILED;
      })

      .addCase(fetchSingleStore.pending, (state, _action) => {
        state.storeStatus = Status.PENDING;
      })
      .addCase(fetchSingleStore.fulfilled, (state, action) => {
        state.storeStatus = Status.FULLFILED;
        state.store = action.payload;
      })
      .addCase(fetchSingleStore.rejected, (state, _action) => {
        state.storeStatus = Status.FAILED;
      });
  },
});

export const getAllStores = (state) => state.stores.allStores;
export const getAllStoresStatus = (state) => state.stores.allStoresStatus;
export const getAllStoresError = (state) => state.stores.error;

export const getStore = (state) => state.stores.store;
export const getStoreStatus = (state) => state.stores.storeStatus;

export const { resetStores } = storesSlice.actions;

export default storesSlice.reducer;
