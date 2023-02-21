const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const isAlreadyAdded = state.cart.find(
        (product) => product.name === action.payload.name
      );
      if (!isAlreadyAdded) {
        let product = action.payload;
        product.quantity = 1;
        state.cart.push(product);
      }
    },
    removeProductFromCart: (state, action) => {
      state.cart.splice(
        state.cart.findIndex((item) => item.name === action.payload),
        1
      );
    },
    increaseProductQuantityInCart: (state, action) => {
      let product = state.cart.find(
        (product) => product.name === action.payload
      );

      product.quantity += 1;
    },
    decreaseProductQuantityInCart: (state, action) => {
      let product = state.cart.find(
        (product) => product.name === action.payload
      );

      if (product.quantity > 1) product.quantity -= 1;
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,
  emptyCart,
} = cartSlice.actions;

export const getProductsFromCart = (state) => state.cart.cart;

export default cartSlice.reducer;
