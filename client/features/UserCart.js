import React, { useEffect, useState } from 'react'
import { fetchCartAsync, selectCart, adjustQtyAsync, removeCartItemAsync } from './slices/cartSlice'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';


const UserCart = () => {

  const user = useSelector((state) => state.auth.me);
  console.log("USER", user)

  const cart = useSelector(selectCart);
  console.log("USER CART CART", cart)
  const id = useSelector((state) => state.auth.me.cartId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);

  const handleRemove = (item) => {
    let idx = item.id
    let cartId = user.cartId
    dispatch(removeCartItemAsync({idx, cartId}))
  }

  const increaseQty = (item) => {
    let id = item.id
    let cartId = user.cartId
    let quantity = item.quantity
    quantity++
    const updatedQty = { id, quantity, cartId }
    dispatch(adjustQtyAsync(updatedQty))
  }

  const decreaseQty = (item) => {
    let id = item.id
    let cartId = user.cartId
    let quantity = item.quantity
    quantity--
    const updatedQty = { id, quantity, cartId }
    dispatch(adjustQtyAsync(updatedQty))
  }

  const getCartTotal = () => {
    let cartTotal = 0
    for (let i = 0; i < cart.length; i++) {
      let itemTotal = cart[i].product.price * cart[i].quantity;
      cartTotal += itemTotal
    }
    return cartTotal
  }

  getCartTotal()

  return (
    <>
      {cart && cart.length ? cart.map((item) => {
        if(item.quantity<1){
          handleRemove(item)
        }
        else{
        return (
          <div className="productContainer" key={item.product.id}>
            <h2 className="productName">{item.product.name}</h2>
            <h2 className="productPrice">${item.product.price}</h2>
            <h2 className="productQty">Qty: {item.quantity}</h2>
            <img src={item.product.imageUrl} />
            <button onClick={() => {
              increaseQty(item)
            }}>+</button>
            <small>{item.quantity}</small>
            <button onClick={() => {
              decreaseQty(item)
            }}>-</button>
            <button onClick={()=>{
              handleRemove(item)
            }}
              >Remove Item</button>
          </div>
        )
          }
      }
      )
        : "No Items in Cart"
      }<h1>Total: ${getCartTotal()}</h1>
      <Link to={`/checkout/${id}`}><button>Checkout</button> </Link>
    </>
  )
}

export default UserCart
