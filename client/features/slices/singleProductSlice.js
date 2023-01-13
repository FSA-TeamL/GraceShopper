import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleProductAsync = createAsyncThunk('products/fetchSingle', async (productId) => {
  const {data} = await axios.get(`http://localhost:3000/api/products/${productId}`);
  // console.log("SINGLE PRODUCT THUNK", data)
  return data;
});

// ***USE FOR ADMIN***
// export const editCampusAsync = createAsyncThunk('campus/editCampus',
// async ( {campusId, name, address}) => {
//   const { data } = await axios.put(`http://localhost:3000/api/campuses/${campusId}`,
//   {
//     name,
//     address,
//   });
//   return data;
// });

export const singleProductSlice = createSlice({
  name: 'product',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // ***USE FOR ADMIN***
    // builder.addCase(editCampusAsync.fulfilled, (state, action) => {
    //   return action.payload;
    // });
  }
});

export const selectSingleProduct = (state) => state.product;

export default singleProductSlice.reducer;
