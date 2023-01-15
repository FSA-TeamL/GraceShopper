import React from "react";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../slices/allCartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h2>{item.name}</h2>
        <h2>${item.price}</h2>
        <h2>Qty: {item.quantity}</h2>
        <img src={item.imageUrl} />
        <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
        <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
      </div>
    </>
  );
};

export default CartItem;
