import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const initialState = {
  deliveries: [],
  status: "idle",
  error: null,
};

export const fetchDeliveries = createAsyncThunk(
  "deliveries/getDeliveries",
  async () => {
    try {
      let deliveries = [];

      const q = query(
        collection(db, "orders"),
        where("isDelivered", "==", false),
        where("deliverer", "==", null)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { id, isDelivered, comment } = doc.data();
        const order = {
          id,
          isDelivered,
          comment,
        };

        deliveries.push(order);

        // console.log("doc: ", doc.data());
      });

      return deliveries;
    } catch (error) {
      return error.message;
    }
  }
);

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDeliveries.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("fetch deliveries data", action.payload);
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getDeliveries = (state) => state.deliveries.deliveries;
export const getDeliveriesStatus = (state) => state.deliveries.status;
export const getDeliveriesError = (state) => state.deliveries.error;
// export const getDelivery = (state) => state.deliveries

export default deliveriesSlice.reducer;
