const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  // ako u jednoj narudzbini postoje proizvodi iz vise prodavnica, svaka prodavnica ce imati svoj objekat "order" i proizvode
  order: [
    // {
    //   storeName: "",
    //   cart: [],
    //   totalPrice: 0,
    //   user: null,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const { product, storeName } = action.payload;
      product.quantity = 1;

      const order = state.order.find((o) => o.storeName === storeName);
      const orderIndex = state.order.findIndex(
        (o) => o.storeName === storeName
      );

      console.log("Before update: ", state.order[orderIndex]);

      if (order) {
        const isAlreadyAdded = order.cart.find((p) => p.name === product.name);
        if (!isAlreadyAdded) {
          order.cart.push(product);
          order.totalPrice += Number(product.price);

          state.order[orderIndex] = order;

          console.log("After update: ", state.order[orderIndex]);
        }
      } else {
        let tempCart = [];
        tempCart.push(product);

        state.order.push({
          storeName,
          cart: tempCart,
          totalPrice: Number(product.price),
          user: null,
        });
      }
    },
    removeProductFromCart: (state, action) => {
      state.cart.forEach((product) => {
        if (product.name === action.payload) {
          state.totalPrice -= product.price * product.quantity;
        }
      });

      state.cart.splice(
        state.cart.findIndex((item) => item.name === action.payload),
        1
      );
    },
    increaseProductQuantityInCart: (state, action) => {
      let product = state.cart.find(
        (product) => product.name === action.payload
      );

      state.totalPrice -= product.price * product.quantity;

      product.quantity += 1;

      state.totalPrice += product.price * product.quantity;
    },
    decreaseProductQuantityInCart: (state, action) => {
      let product = state.cart.find(
        (product) => product.name === action.payload
      );

      if (product.quantity > 1) {
        state.totalPrice -= product.price * product.quantity;

        product.quantity -= 1;
        state.totalPrice += product.price * product.quantity;
      }
    },

    emptyCart: (state, action = undefined) => {
      state.cart = [];
    },
    confirmOrder: (state, action = undefined) => {
      state.cart.forEach((product) => {
        let tempPrice = product.price * product.quantity;
        state.totalPrice += tempPrice;
      });
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,
  emptyCart,
  confirmOrder,
} = cartSlice.actions;

export const getProductsFromCart = (state) => {
  let tempProducts = [];

  state.cart.order.forEach((order) => {
    order.cart.forEach((product) => {
      tempProducts.push(product);
    });
  });

  return tempProducts;
};
export const getTotalPrice = (state) => {
  let tempTotalPrice = 0;

  state.cart.order.forEach((order) => {
    tempTotalPrice += order.totalPrice;
  });

  return tempTotalPrice;
};

export default cartSlice.reducer;
