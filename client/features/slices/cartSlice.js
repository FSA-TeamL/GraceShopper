const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchAll",
  async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/cart/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/add",
  async ({cartId, productId}) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/api/cart/${cartId}`, {
        cartId,
        productId
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
