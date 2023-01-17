import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import AllProducts from "../features/allProduct/AllProducts";
import SingleProduct from "../features/singleProduct/SingleProduct";
import UserCart from "../features/UserCart";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import VisitorCart from "../features/VisitorCart";
import UserCheckout from "../features/UserCheckout/UserCheckout"
import VisitorCheckout from "../features/VisitorCheckout/VisitorCheckout";
import Confirmation from "../features/confirmation/Confirmation";
import Users from "../features/users/Users"


const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.me.cartId);
  console.log("APP ROUTES ID", id)

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>

      {isLoggedIn ? (
        <Routes>
          <Route path={`/usercart/${id}`} element={<UserCart />} />
          <Route path={`/checkout/${id}`} element={<UserCheckout />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/cart" element={<VisitorCart />} />
          <Route path="/visitorCheckout/:visitorId" element={<VisitorCheckout />} />
        </Routes>
      )}

      <Routes>
        <Route exact path="/" element={<Navigate to="/products" />} />
        <Route exact path="/home" element={<Navigate to="/products" />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/signup"
          element={<AuthForm name="signup" displayName="Sign Up" />}
        />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
