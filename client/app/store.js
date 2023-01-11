import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/slices/allProductsSlice";
import singleProductReducer from "../features/slices/singleProductSlice";
import {cartReducer} from "../features/slices/allCartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: singleProductReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
