import React from "react";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../slices/allCartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item, quantity = 0 }) => {
  const cart = useSelector((state) => state.cart2);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h2>{item.name}</h2>
        <h2>${item.price}</h2>
        <img src={item.imageUrl} />
      </div>
      <div>
        <p>{item.quantity}</p>
      </div>
    </>
  );
};

export default CartItem;
