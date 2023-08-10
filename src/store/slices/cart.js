import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActionType, Status } from "../../util";

export const createOrder = createAsyncThunk("orders/create", async () => {
  try {
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  order: [
    // array of products
  ],
  orderDetails: {
    firstname: "",
    lastname: "",
    address: "",
    price: 0,
    deliveryFee: 50,
  },
  isDelivered: false,
  rating: 0,
  comment: "",
  deliveredAt: null,
  createdAt: null,

  status: Status.IDLE, // for createOrder
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product, store } = action.payload;

      const tempProduct = { ...product };
      tempProduct.quantity = 1;
      tempProduct.storeId = store.id;
      tempProduct.storeName = store.name;

      state.order.push(tempProduct);
      state.orderDetails.price += tempProduct.price;
    },
    removeProductFromCart: (state, action) => {
      const { product } = action.payload;

      state.order.splice(
        state.order.findIndex((item) => item.id === product.id),
        1
      );
      state.orderDetails.price -= product.price * product.quantity;
    },
    updateProductQuantity: (state, action) => {
      const { product, actionType } = action.payload;

      const cartProduct = state.order.find((item) => item.id === product.id);
      if (cartProduct) {
        if (actionType === ActionType.INCREASE) {
          cartProduct.quantity += 1;

          state.orderDetails.price += cartProduct.price;
        } else if (actionType === ActionType.DECREASE) {
          if (cartProduct.quantity > 1) {
            cartProduct.quantity -= 1;
          } else {
            state.order.splice(
              state.order.findIndex((item) => item.id === cartProduct.id),
              1
            );
          }
          state.orderDetails.price -= cartProduct.price;
        }
      }
    },
    resetCart: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, _action) => {
        state.status = Status.PENDING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = Status.FULLFILED;
      })
      .addCase(createOrder.rejected, (state, _action) => {
        state.status = Status.FAILED;
      });
  },
});

export const getCartData = (state) => state.cart.order;
export const getCartDetails = (state) => state.cart.orderDetails;

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
