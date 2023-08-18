import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Status } from "../../util";

export const fetchCompletedDeliveries = createAsyncThunk(
  "deliveries/fetchCompletedDeliveries",
  async (delivererId) => {
    try {
      const completedDeliveries = [];

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

        completedDeliveries.push({
          docId: doc.id,
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

      return completedDeliveries;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAvailableOrders = createAsyncThunk(
  "deliveries/allOrders",
  async () => {
    try {
      let orders = [];

      const q = query(
        collection(db, "orders"),
        where("delivererId", "==", ""),
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
          docId: doc.id,
          id,
          comment,
          createdAt,
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

export const fetchDeliveriesInProgress = createAsyncThunk(
  "deliveries/fetchDeliveriesInProgress",
  async (delivererId) => {
    try {
      const deliveries = [];

      const q = query(
        collection(db, "orders"),
        where("delivererId", "==", delivererId),
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

        deliveries.push({
          docId: doc.id,
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

export const initialState = {
  completedDeliveries: [],
  deliveriesInProgress: [],
  availableOrders: [],

  availableOrdersStatus: Status.IDLE,
  deliveriesInProgressStatus: Status.IDLE,
  completedDeliveriesStatus: Status.IDLE,
};

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    refetchData: (state, _action) => {
      state.availableOrdersStatus = Status.IDLE;
      state.deliveriesInProgressStatus = Status.IDLE;
      state.completedDeliveriesStatus = Status.IDLE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompletedDeliveries.pending, (state, _action) => {
        state.completedDeliveriesStatus = Status.PENDING;
      })
      .addCase(fetchCompletedDeliveries.fulfilled, (state, action) => {
        state.completedDeliveriesStatus = Status.FULLFILED;
        state.completedDeliveries = action.payload;
      })
      .addCase(fetchCompletedDeliveries.rejected, (state, _action) => {
        state.completedDeliveriesStatus = Status.FAILED;
      })

      .addCase(fetchAvailableOrders.pending, (state, _action) => {
        state.availableOrdersStatus = Status.PENDING;
      })
      .addCase(fetchAvailableOrders.fulfilled, (state, action) => {
        state.availableOrdersStatus = Status.FULLFILED;
        state.availableOrders = action.payload;
      })
      .addCase(fetchAvailableOrders.rejected, (state, _action) => {
        state.availableOrdersStatus = Status.FAILED;
      })
      .addCase(fetchDeliveriesInProgress.pending, (state, _action) => {
        state.deliveriesInProgressStatus = Status.PENDING;
      })
      .addCase(fetchDeliveriesInProgress.fulfilled, (state, action) => {
        state.deliveriesInProgressStatus = Status.FULLFILED;
        state.deliveriesInProgress = action.payload;
      })
      .addCase(fetchDeliveriesInProgress.rejected, (state, _action) => {
        state.deliveriesInProgressStatus = Status.FAILED;
      });
  },
});

export const getCompletedDeliveries = (state) =>
  state.deliveries.completedDeliveries;
export const getCompletedDeliveriesStatus = (state) =>
  state.deliveries.completedDeliveriesStatus;

export const getAvailableOrders = (state) => state.deliveries.availableOrders;
export const getAvailableOrdersStatus = (state) =>
  state.deliveries.availableOrdersStatus;

export const getDeliveriesInProgress = (state) =>
  state.deliveries.deliveriesInProgress;
export const getDeliveriesInProgressStatus = (state) =>
  state.deliveries.deliveriesInProgressStatus;

export const { refetchData } = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
