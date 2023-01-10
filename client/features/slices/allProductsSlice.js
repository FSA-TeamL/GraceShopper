const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products");
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;