const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
import axios from "axios";


export const fetchCartAsync = createAsyncThunk("cart/fetchAll", async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/cart/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});
export const addToCartAsync = createAsyncThunk(
  "cart/add",
  async ({ quantity, cartId, productId, imageUrl }) => {
    console.log(`stuff to add to cart: quantity: ${quantity}, cartId: ${cartId}, productId: ${productId}`)
    try {
      await axios.post(`http://localhost:3000/api/cart/${cartId}`, {
        quantity,
        cartId,
        productId,
        imageUrl
      });
      // const { data } = await axios.get(
      //   `http://localhost:3000/api/cart/${cartId}`
      // );
      // return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/remove",
  async ({ idx, cartId }) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${cartId}/${idx}`);
      const { data } = await axios.get(
        `http://localhost:3000/api/cart/${cartId}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const adjustQtyAsync = createAsyncThunk(
  "cart/increase",
  async (cartItem) => {
    try {
      const { id, quantity, cartId } = cartItem;
      const updatedCartItemQty = { id, quantity, cartId };
      await axios.put(
        `http://localhost:3000/api/cart/${cartId}/${id}`, //if issue come back here
        updatedCartItemQty
      );
      const { data } = await axios.get(
        `http://localhost:3000/api/cart/${cartId}`
      );
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
      return action.payload;
    });
    builder.addCase(adjustQtyAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
