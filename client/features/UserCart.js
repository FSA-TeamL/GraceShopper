import React, { useEffect, useState } from "react";
import {
  fetchCartAsync,
  selectCart,
  adjustQtyAsync,
  removeCartItemAsync,
} from "./slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const UserCart = () => {
  const user = useSelector((state) => state.auth.me);

  const cart = useSelector(selectCart);
  const id = useSelector((state) => state.auth.me.cartId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);

  const handleRemove = (item) => {
    let idx = item.id;
    let cartId = user.cartId;
    dispatch(removeCartItemAsync({ idx, cartId }));
  };

  const increaseQty = (item) => {
    let id = item.id;
    let cartId = user.cartId;
    let quantity = item.quantity;
    quantity++;
    const updatedQty = { id, quantity, cartId };
    dispatch(adjustQtyAsync(updatedQty));
  };

  const decreaseQty = (item) => {
    let id = item.id;
    let cartId = user.cartId;
    let quantity = item.quantity;
    quantity--;
    const updatedQty = { id, quantity, cartId };
    dispatch(adjustQtyAsync(updatedQty));
  };

  const getCartTotal = () => {
    let cartTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      let itemTotal = cart[i].product.price * cart[i].quantity;
      cartTotal += itemTotal;
    }
    return cartTotal;
  };

  getCartTotal();

  return (
    <div className="cart">
        <h1>Shopping Cart</h1>
      {cart && cart.length
        ? cart.map((item) => {
            if (item.quantity < 1) {
              handleRemove(item);
            } else {
              return (
                <div className="cartItemContainer" key={item.product.id}>
                  <img src={item.product.imageUrl} className="cartItemImage" />
                  <h2 className="cartItemName">{item.product.name}</h2>
                  <h2 className="cartItemPrice">${item.product.price}</h2>
                  <h2 className="cartItemQty">Qty: {item.quantity}</h2>
                  <button
                    onClick={() => {
                      decreaseQty(item);
                    }}
                  >
                    -
                  </button>
                  <small>{item.quantity}</small>

                  <button
                    onClick={() => {
                      increaseQty(item);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="cartItemRemoveButton"
                    onClick={() => {
                      handleRemove(item);
                    }}
                  >
                    Remove Item
                  </button>
                </div>
              );
            }
          })
        : "No Items in Cart"}
      <h2>ORDER SUMMARY</h2>

      <h1>Total: ${getCartTotal()}</h1>
      <Link to={`/checkout/${id}`}>
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default UserCart;
