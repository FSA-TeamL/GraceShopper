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
export const addProductAsync = createAsyncThunk(
  "product/add",
  async (product) => {
    console.log("this is product in the add thunk", product)
    const { id, name, description, imageUrl, price } = product;
    const { data } = await axios.post("http://localhost:3000/api/products", {
      id,
      name,
      description,
      imageUrl,
      price,
    });
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
