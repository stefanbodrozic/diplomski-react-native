import { createSlice } from "@reduxjs/toolkit";
import { ActionType } from "../../util";

const initialState = {
  order: [
    // array of products
  ],
  orderDetails: {
    userId: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    price: 0,
    deliveryFee: 50,
  },
  delivererId: "",
  isDelivered: false,
  rating: 0,
  comment: "",
  deliveredAt: null,
  createdAt: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product, store, user } = action.payload;

      const tempProduct = { ...product };
      tempProduct.quantity = 1;
      tempProduct.storeId = store.id;
      tempProduct.storeName = store.name;

      state.order.push(tempProduct);
      state.orderDetails.price += tempProduct.price;

      if (state.orderDetails.userId === "") {
        state.orderDetails.userId = user.id;
        state.orderDetails.firstname = user.firstname;
        state.orderDetails.lastname = user.lastname;
        state.orderDetails.address = user.address;
        state.orderDetails.email = user.email;
      }
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
    resetCart: (state, _action) => {
      state.order = [];
      state.orderDetails = {
        userId: "",
        firstname: "",
        lastname: "",
        address: "",
        email: "",
        price: 0,
        deliveryFee: 50,
      };
      state.delivererId = "";
      state.isDelivered = false;
      state.rating = 0;
      state.comment = "";
      state.deliveredAt = null;
      state.createdAt = null;
    },
  },
});

export const getCartData = (state) => state.cart.order;
export const getCartDetails = (state) => state.cart.orderDetails;
export const getCart = (state) => state.cart;
export const getNumberOfProductsInCart = (state) => state.cart.order.length;

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
