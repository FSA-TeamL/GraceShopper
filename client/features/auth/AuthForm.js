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

<<<<<<< HEAD
  // let user = useSelector((state) => state.auth.me)
  let cart = useSelector((state) => state.cart2);

=======
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
>>>>>>> 72130f8bb7146f070a68ea4e7ac332a4ee7a2b68

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

<<<<<<< HEAD


  const handleSubmit = (evt) => {
=======
  const handleSubmit = async (evt) => {
>>>>>>> 72130f8bb7146f070a68ea4e7ac332a4ee7a2b68
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
<<<<<<< HEAD
    dispatch(authenticate({ username, password, method: formName }))
    addToUserCart();
}
=======
    await dispatch(authenticate({ username, password, method: formName }));
    console.log("This is user in the handleSubmit", user)
  };
>>>>>>> 72130f8bb7146f070a68ea4e7ac332a4ee7a2b68


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
