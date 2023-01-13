import React from "react";

const CartItem = ({item}) => {

  return (
    <div>
      <h2>{item.name}</h2>
      <h2>${item.price}</h2>
      <img src={item.imageUrl} />
    </div>
  );
};

export default CartItem;
