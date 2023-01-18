import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { addToCartAsync } from '../slices/cartSlice';
import { remove } from "../slices/allCartSlice"


/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.me);
  const cartId = useSelector((state) => state.auth.me.cartId);
  let cart = useSelector((state) => state.cart2);
  console.log("This is cart from addToUserCart", cart)

  useEffect(() => {
    
  }, [dispatch]);

  useEffect(() => {
    if (cartId) {
      addToUserCart()
    }
  }, [cartId]);

  const addToUserCart = async () => {
    Promise.all(cart.map(async(item)=>{
      let productId = item.id
      console.log("CartId", cartId)
      let quantity = item.quantity
      dispatch(addToCartAsync({quantity, cartId, productId}))
      dispatch(remove(productId))
      //dispatch map through the Visitor cart to remove
    }))
      navigate("/products")
    }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    await dispatch(authenticate({ username, password, method: formName }));
    console.log("This is user in the handleSubmit", user)
  };


  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
          </label>
          <input name="username" type="text" placeholder='Email' />
        </div>
        <div>
          <label htmlFor="password">
          </label>
          <input name="password" type="password" placeholder='Password' />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
