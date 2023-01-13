import React, { useEffect, useState } from 'react'
import { fetchCartAsync, selectCart, increaseQtyAsync } from './slices/cartSlice'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const UserCart = () => {

  const user = useSelector((state) => state.auth.me);

  const cart = useSelector(selectCart);
  console.log(cart)
  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);

  const handleQty = (item) => {
    let id = item.id
    let cartId = user.cartId
    let quantity = item.quantity
    quantity ++
    const updatedQty = { id, quantity, cartId }
    dispatch(increaseQtyAsync(updatedQty))
  }


  return (
    <>
     {cart && cart.length ? cart.map((item) => {
          return (
            <div className="productContainer" key={item.product.id}>
              <h2 className="productName">{item.product.name}</h2>
              <h2 className="productPrice">${item.product.price}</h2>
              <h2 className="productQty">Qty: {item.quantity}</h2>
              <img src={item.product.imageUrl} />
              <button onClick={()=>{
                handleQty(item)
                }}>ANOTHA ONE</button>
              </div>
        )}
     )
     : "No Items in Cart"
    }
    </>
    )
}

export default UserCart
