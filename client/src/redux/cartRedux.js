import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    favourites: [],
  },
  reducers: {
    saveItem: (state, action) => {
      const itemInFavourites = state.favourites.find(
        (item) => item === action.payload
      );

      if (itemInFavourites) {
        // Item is already in favourites, remove it
        state.favourites = state.favourites.filter(
          (item) => item !== action.payload
        );
      } else {
        // Item is not in favourites, add it
        state.favourites.push(action.payload);
      }
    },
    addToCart: (state, action) => {
      const itemInCart = state.products.find(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const { _id, size, color } = action.payload;

      state.products = state.products.filter(
        (item) => item._id !== _id || item.size !== size || item.color !== color
      );
    },
  },
});

export default cartSlice.reducer;
export const {
  saveItem,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
