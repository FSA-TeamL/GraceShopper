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

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
