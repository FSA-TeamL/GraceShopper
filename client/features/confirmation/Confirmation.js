import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart, adjustQtyAsync } from '../slices/cartSlice'
import { useParams, Link } from 'react-router-dom';



const Confirmation = () => {

  const user = useSelector((state) => state.auth.me);
  console.log("USER", user)

  const cart = useSelector(selectCart);
  console.log("CHECKOUT CART", cart);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    console.log('formName', formName)
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <>
    <div>CONFIRMATION TESTING</div>
      </>
  )
}

export default Confirmation;