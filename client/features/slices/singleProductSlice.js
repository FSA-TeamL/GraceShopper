import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleProductAsync = createAsyncThunk(
  "products/fetchSingle",
  async (productId) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${productId}`
    );
    // console.log("SINGLE PRODUCT THUNK", data)
    return data;
  }
);

export const editProductAsync = createAsyncThunk(
  "product/edit",
  async (product) => {
    try {
      const { id, name, description, imageUrl, price } = product;
      const updatedProduct = { id, name, description, imageUrl, price };
      const { data } = await axios.put(
        `http://localhost:3000/api/products/${product.productId}`, //if issue come back here
        updatedProduct
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/delete",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => state.product;

export default singleProductSlice.reducer
