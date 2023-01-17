import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart2",
  initialState: localStorage.getItem("add") ? JSON.parse(localStorage.getItem("add")) : [],
  reducers: {
    addToCart(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("add", JSON.stringify(state))
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
      localStorage.setItem("increase", JSON.stringify(state))

    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      localStorage.setItem("decrease", JSON.stringify(state))
    },
    removeItem: (state, action) => {
      const filteredItems = state.filter((item) => item.id !== action.payload);
      return filteredItems;
    },
  },
});
export default cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
