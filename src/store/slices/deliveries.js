import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { Status } from '../../util'

export const fetchUnpreparedOrdersFromWarehouse = createAsyncThunk(
  'deliveries/fetchUnpreparedOrdersFromWarehouse',
  async () => {
    try {
      const orders = []

      const q = query(
        collection(db, 'orders'),
        where('isReadyInWarehouse', '==', false),
        where('isDelivered', '==', false)
      )

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        const { id, comment, createdAt, orderDetails, order } = doc.data()

        orders.push({
          docId: doc.id,
          id,
          comment,
          createdAt,
          orderDetails,
          order
        })
      })

      return orders
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const fetchCompletedDeliveries = createAsyncThunk(
  'deliveries/fetchCompletedDeliveries',
  async (delivererId) => {
    try {
      const completedDeliveries = []

      const q = query(
        collection(db, 'orders'),
        where('delivererId', '==', delivererId),
        where('isDelivered', '==', true),
        where('isReadyInWarehouse', '==', true)
      )

      const querySnapshot = await getDocs(q)

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
          isReadyInWarehouse
        } = doc.data()

        completedDeliveries.push({
          docId: doc.id,
          id,
          comment,
          createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
          isReadyInWarehouse
        })
      })

      return completedDeliveries
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAvailableOrders = createAsyncThunk(
  'deliveries/allOrders',
  async () => {
    try {
      let orders = []

      const q = query(
        collection(db, 'orders'),
        where('delivererId', '==', ''),
        where('isDelivered', '==', false),
        where('isReadyInWarehouse', '==', true)
      )

      const querySnapshot = await getDocs(q)

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
          order,
          isReadyInWarehouse
        } = doc.data()

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
          order,
          isReadyInWarehouse
        })
      })

      return orders
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchDeliveriesInProgress = createAsyncThunk(
  'deliveries/fetchDeliveriesInProgress',
  async (delivererId) => {
    try {
      const deliveries = []

      const q = query(
        collection(db, 'orders'),
        where('delivererId', '==', delivererId),
        where('isDelivered', '==', false),
        where('isReadyInWarehouse', '==', true)
      )

      const querySnapshot = await getDocs(q)

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
          order,
          isReadyInWarehouse
        } = doc.data()

        deliveries.push({
          docId: doc.id,
          id,
          comment,
          createdAt,
          deliveredAt,
          delivererId,
          isDelivered,
          orderDetails,
          rating,
          order,
          isReadyInWarehouse
        })
      })

      return deliveries
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchCustomerOrders = createAsyncThunk(
  'deliveries/fetchCustomerOrders',
  async (customerId) => {
    try {
      const orders = []

      const q = query(
        collection(db, 'orders'),
        where('orderDetails.userId', '==', customerId)
      )

      const querySnapshot = await getDocs(q)

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
          order
        } = doc.data()

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
          order
        })
      })

      return orders
    } catch (error) {
      console.log(error)
    }
  }
)

export const initialState = {
  unpreparedOrdersFromWarehouse: [],
  completedDeliveries: [],
  deliveriesInProgress: [],
  availableOrders: [],
  customerOrders: [],
  unpreparedOrdersFromWarehouseStatus: Status.IDLE,
  availableOrdersStatus: Status.IDLE,
  deliveriesInProgressStatus: Status.IDLE,
  completedDeliveriesStatus: Status.IDLE,
  customerOrdersStatus: Status.IDLE
}

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    refetchData: (state, _action) => {
      state.availableOrdersStatus = Status.IDLE
      state.deliveriesInProgressStatus = Status.IDLE
      state.completedDeliveriesStatus = Status.IDLE
    },
    resetDeliveries: (state, _action) => {
      state.unpreparedOrdersFromWarehouse = []
      state.completedDeliveries = []
      state.deliveriesInProgress = []
      state.availableOrders = []
      state.customerOrders = []

      state.availableOrdersStatus = Status.IDLE
      state.deliveriesInProgressStatus = Status.IDLE
      state.completedDeliveriesStatus = Status.IDLE
      state.customerOrdersStatus = Status.IDLE
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUnpreparedOrdersFromWarehouse.pending, (state, _action) => {
        state.unpreparedOrdersFromWarehouseStatus = Status.PENDING
      })
      .addCase(
        fetchUnpreparedOrdersFromWarehouse.fulfilled,
        (state, action) => {
          state.unpreparedOrdersFromWarehouseStatus = Status.FULLFILED
          state.unpreparedOrdersFromWarehouse = action.payload
        }
      )
      .addCase(fetchUnpreparedOrdersFromWarehouse.rejected, (state, action) => {
        state.unpreparedOrdersFromWarehouseStatus = Status.FAILED
      })

      .addCase(fetchCompletedDeliveries.pending, (state, _action) => {
        state.completedDeliveriesStatus = Status.PENDING
      })
      .addCase(fetchCompletedDeliveries.fulfilled, (state, action) => {
        state.completedDeliveriesStatus = Status.FULLFILED
        state.completedDeliveries = action.payload
      })
      .addCase(fetchCompletedDeliveries.rejected, (state, _action) => {
        state.completedDeliveriesStatus = Status.FAILED
      })

      .addCase(fetchAvailableOrders.pending, (state, _action) => {
        state.availableOrdersStatus = Status.PENDING
      })
      .addCase(fetchAvailableOrders.fulfilled, (state, action) => {
        state.availableOrdersStatus = Status.FULLFILED
        state.availableOrders = action.payload
      })
      .addCase(fetchAvailableOrders.rejected, (state, _action) => {
        state.availableOrdersStatus = Status.FAILED
      })

      .addCase(fetchDeliveriesInProgress.pending, (state, _action) => {
        state.deliveriesInProgressStatus = Status.PENDING
      })
      .addCase(fetchDeliveriesInProgress.fulfilled, (state, action) => {
        state.deliveriesInProgressStatus = Status.FULLFILED
        state.deliveriesInProgress = action.payload
      })
      .addCase(fetchDeliveriesInProgress.rejected, (state, _action) => {
        state.deliveriesInProgressStatus = Status.FAILED
      })

      .addCase(fetchCustomerOrders.pending, (state, _action) => {
        state.customerOrdersStatus = Status.PENDING
      })
      .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
        state.customerOrders = action.payload
        state.customerOrdersStatus = Status.FULLFILED
      })
  }
})

export const getUnpreparedOrdersFromWarehouse = (state) =>
  state.deliveries.unpreparedOrdersFromWarehouse

export const getUnpreparedOrdersFromWarehouseStatus = (state) =>
  state.deliveries.unpreparedOrdersFromWarehouseStatus

export const getCompletedDeliveries = (state) =>
  state.deliveries.completedDeliveries
export const getCompletedDeliveriesStatus = (state) =>
  state.deliveries.completedDeliveriesStatus

export const getAvailableOrders = (state) => state.deliveries.availableOrders
export const getAvailableOrdersStatus = (state) =>
  state.deliveries.availableOrdersStatus

export const getDeliveriesInProgress = (state) =>
  state.deliveries.deliveriesInProgress
export const getDeliveriesInProgressStatus = (state) =>
  state.deliveries.deliveriesInProgressStatus

export const getCustomerOrders = (state) => state.deliveries.customerOrders
export const getCustomerOrdersStatus = (state) =>
  state.deliveries.customerOrdersStatus

export const { refetchData, resetDeliveries } = deliveriesSlice.actions

export default deliveriesSlice.reducer
