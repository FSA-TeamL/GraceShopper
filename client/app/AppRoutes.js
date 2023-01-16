import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AllProducts from "../features/allProduct/AllProducts";
import SingleProduct from "../features/singleProduct/SingleProduct";
import UserCart from "../features/UserCart";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import VisitorCart from "../features/VisitorCart";
import Checkout from "../features/checkout/Checkout";


const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>

      {isLoggedIn ? (
        <Routes>
          <Route path="/usercart/:id" element={<UserCart />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/cart" element={<VisitorCart />} />
        </Routes>
        )}
        <Routes>
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/*" element={<AllProducts />} />
          <Route to="/home" element={<AllProducts />} />
        </Routes>
    </div>
  );
};

export default AppRoutes;
