import React from "react";
import { useDispatch } from "react-redux";

const CartItem = ({yo}) => {

  return (
    <div>
      <div>{yo.name}</div>
      
    </div>
  );
};

export default CartItem;
