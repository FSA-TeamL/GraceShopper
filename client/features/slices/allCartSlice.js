import { createSlice } from "@reduxjs/toolkit";

const local = localStorage.getItem("local") ? JSON.parse(localStorage.getItem("local")) : [];

const cartSlice = createSlice({
  name: "cart2",
  initialState: local,
  reducers: {
    addToCart(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("local", JSON.stringify(state))
    },
    increase(state, action) {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
      localStorage.setItem("local", JSON.stringify(state))
    },
    decrease(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      localStorage.setItem("local", JSON.stringify(state))
    },
    remove: (state, action) => {
      const filteredItems = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("local", JSON.stringify(filteredItems))
      return filteredItems;
    },
  },
});
export default cartSlice.reducer;

export const { addToCart, increase, decrease, remove } =
  cartSlice.actions;
