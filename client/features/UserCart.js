import React, { useEffect } from 'react'
import { fetchCartAsync, selectCart } from './slices/cartSlice'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const UserCart = () => {

  const cart = useSelector(selectCart);
  console.log(cart)
  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);


  return (
    <>
     {cart.map((item) => {
          return (
            <div className="productContainer" key={item.product.id}>
              <h2 className="productName">{item.product.name}</h2>
              <h2 className="productPrice">${item.product.price}</h2>
              <img src={item.product.imageUrl} />
              </div>
        )}
     )}
    </>
    )
}

export default UserCart
