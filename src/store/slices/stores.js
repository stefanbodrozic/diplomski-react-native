import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Status } from "../../util";

export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  try {
    let stores = [];

    const querySnapshot = await getDocs(collection(db, "stores"));
    querySnapshot.forEach((doc) => {
      const { id, address, storeName, userUid } = doc.data();

      stores.push({
        id,
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

const initialState = {
  data: [],
  status: Status.IDLE,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchStores.pending, (state, _action) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = Status.FULLFILED;
        state.data = action.payload;
      })
      .addCase(fetchStores.rejected, (state, _action) => {
        state.status = Status.FAILED;
      });
  },
});

export const getStores = (state) => state.stores.data;
export const getStoresStatus = (state) => state.stores.status;
export const getStoresError = (state) => state.stores.error;

export default storesSlice.reducer;
