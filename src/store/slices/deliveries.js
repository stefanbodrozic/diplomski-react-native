import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Status } from "../../util";

export const fetchDeliveries = createAsyncThunk(
  "deliveries/fetchDeliveries",
  async (delivererId) => {
    try {
      const deliveries = [];

      const q = query(
        collection(db, "orders"),
        where("delivererId", "==", delivererId),
        where("isDelivered", "==", true)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          id,
          comment,
          createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
        } = doc.data();

        deliveries.push({
          id,
          comment,
          // createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
        });
      });

      return deliveries;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "deliveries/allOrders",
  async () => {
    try {
      let orders = [];

      const q = query(
        collection(db, "orders"),
        where("isDelivered", "==", false)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          id,
          comment,
          createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
        } = doc.data();

        orders.push({
          id,
          comment,
          // createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
        });
      });

      return orders;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  deliveries: [],
  orders: [],
  ordersStatus: Status.IDLE,
  status: Status.IDLE,
  error: null,
};

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchDeliveries.pending, (state, _action) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.status = Status.FULLFILED;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, _action) => {
        state.status = Status.FAILED;
      })

      .addCase(fetchAllOrders.pending, (state, _action) => {
        state.ordersStatus = Status.PENDING;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.ordersStatus = Status.FULLFILED;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, _action) => {
        state.ordersStatus = Status.FAILED;
      });
  },
});

export const getDeliveries = (state) => state.deliveries.deliveries;
export const getDeliveriesStatus = (state) => state.deliveries.status;
export const getDeliveriesError = (state) => state.deliveries.error;

export const getOrders = (state) => state.deliveries.orders;
export const getOrdersStatus = (state) => state.deliveries.ordersStatus;
export const getOrdersError = (state) => state.deliveries.error;

export default deliveriesSlice.reducer;
