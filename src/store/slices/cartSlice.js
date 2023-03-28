const { createSlice } = require("@reduxjs/toolkit");
import uuid from "react-native-uuid";
import { serverTimestamp } from "firebase/firestore";

const initialState = {
  // ako u jednoj narudzbini postoje proizvodi iz vise prodavnica, svaka prodavnica ce imati svoj objekat "order" i proizvode

  orders: [
    // {
    //   storeName: "",
    //   cart: [],
    //   totalPrice: 0,
    //   user: null,
    // },
  ],
  id: uuid.v4(),
  user: {},
  userDetails: {}, // address or phone number..
  deliverer: null,
  isDelivered: false,
  rating: 0,
  comment: "to be added",
  deliveredTimestamp: null,
  timestamp: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product, storeName } = action.payload;
      product.quantity = 1;

      const order = state.orders.find((o) => o.storeName === storeName);
      const orderIndex = state.orders.findIndex(
        (o) => o.storeName === storeName
      );

      if (order) {
        const isAlreadyAdded = order.cart.find((p) => p.name === product.name);
        if (!isAlreadyAdded) {
          order.cart.push(product);
          order.totalPrice += Number(product.price);

          state.orders[orderIndex] = order;
        }
      } else {
        let tempCart = [];
        tempCart.push(product);

        state.orders.push({
          storeName,
          cart: tempCart,
          totalPrice: Number(product.price),
          user: null,
        });
      }
    },
    removeProductFromCart: (state, action) => {
      state.orders.forEach((order) => {
        order.cart.forEach((product) => {
          if (product.name === action.payload) {
            order.totalPrice -= product.price * product.quantity;

            order.cart.splice(
              order.cart.findIndex((item) => item.name === action.payload),
              1
            );
          }
        });
      });
    },

    setProductQuantityInCart: (state, action) => {
      const { name, type } = action.payload;

      state.orders.forEach((order) => {
        order.cart.forEach((product) => {
          if (product.name === name) {
            if (type === "increase") {
              product.quantity += 1;
              // order.cart.totalPrice = product.price * product.quantity;
            } else {
              if (product.quantity > 1) {
                product.quantity -= 1;
                // order.cart.totalPrice = product.price * product.quantity;
              }
            }
            // order.cart.totalPrice = product.quantity * product.price;
          }
        });
      });
    },
    emptyCart: (state, action = undefined) => {
      state.cart = [];
    },
    confirmOrder: (state, action = undefined) => {
      // state.cart.forEach((product) => {
      //   let tempPrice = product.price * product.quantity;
      //   state.totalPrice += tempPrice;
      // });
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  setProductQuantityInCart,
  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,
  emptyCart,
  confirmOrder,
} = cartSlice.actions;

export const getProductsFromCart = (state) => {
  let tempProducts = [];

  state.cart.orders.forEach((order) => {
    order.cart.forEach((product) => {
      tempProducts.push(product);
    });
  });

  return tempProducts;
};
export const getTotalPrice = (state) => {
  let tempTotalPrice = 0;

  state.cart.orders.forEach((order) => {
    tempTotalPrice += order.totalPrice;
  });

  return tempTotalPrice;
};

export const getOrder = (state) => {
  return state.cart;
};

export default cartSlice.reducer;
