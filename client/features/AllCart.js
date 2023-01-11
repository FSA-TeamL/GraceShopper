import React, { useEffect } from 'react'
import { fetchCartAsync, selectCart } from './slices/cartSlice'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const AllCart = () => {

  const cart = useSelector(selectCart);

  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);


  return (
    <h1>Your Cart Items</h1>
    )
}

export default AllCart
