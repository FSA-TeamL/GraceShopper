import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { addToCartAsync, fetchCartAsync } from '../slices/cartSlice';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // let user = useSelector((state) => state.auth.me)
  let cart = useSelector((state) => state.cart2);


  const addToUserCart = async () => {
    let user = useSelector((state) => state.auth.me)
    let cart = useSelector((state) => state.cart2);
      cart.forEach((item)=>{
        let productId = item.id
        let cartId = user.cartId
        let quantity = item.quantity
        dispatch(addToCartAsync({quantity, cartId, productId}))
      })
    }



  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }))
    addToUserCart();
}


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
