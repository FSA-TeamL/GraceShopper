import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const VisitorCart = () => {
  const cart = useSelector((state) => state.cart2);
  console.log("CURT", cart)
  const visitorId = cart.id;

  const Total = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    } );
    let roundPrice = totalPrice.toFixed(2)
    return { roundPrice, totalQuantity };
  };

  return (
    <>
      <div>
        <h1>Shopping Cart</h1>
        {cart?.map((product) => (
          <CartItem key={product.id} item={product} />
        ))}
      </div>
      <h2>ORDER SUMMARY</h2>
      <div>
        <h1>
          Total: ${Total().roundPrice}
        </h1>
      </div>
      <Link to={`/visitorCheckout/${visitorId}`}><button>Checkout</button> </Link>
    </>
  );
};

export default VisitorCart;
