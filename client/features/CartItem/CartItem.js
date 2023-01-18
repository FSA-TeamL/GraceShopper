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
      <div className="cartItemContainer">
      <img className="productImage" src={item.imageUrl} />
        <h2 className="cartItemName">{item.name}</h2>
        <h2 className="cartItemPrice">${item.price}</h2>
        <h2 className="cartItemQty">Qty: {item.quantity}</h2>
        <button onClick={() => dispatch(decrease(item.id))}>
            -
          </button>
          <small>{item.quantity}</small>
          <button onClick={() => dispatch(increase(item.id))}>
            +
          </button>
          <button className="cartItemRemoveButton" onClick={() => dispatch(remove(item.id))}>Remove</button>
        </div>
    </>
  );
};

export default CartItem;
