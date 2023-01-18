import React from "react";
import {
  increase,
  decrease,
  remove,
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
        <div>
          <button onClick={() => dispatch(increase(item.id))}>
            +
          </button>
          <button onClick={() => dispatch(decrease(item.id))}>
            -
          </button>
          <button onClick={() => dispatch(remove(item.id))}>Remove</button>
        </div>
        <img src={item.imageUrl} />
      </div>
    </>
  );
};

export default CartItem;
