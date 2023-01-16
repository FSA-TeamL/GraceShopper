import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart, adjustQtyAsync } from '../slices/cartSlice'
import { useParams, Link } from 'react-router-dom';



const Checkout = () => {

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
    <div className="checkout">
    <div className='checkoutHeader'>
        <h1 className="checkoutTitle">CHECKOUT</h1>
        <div className="checkoutLoginSignup">
          <div className="checkoutLogin">
            <span>Already have an accout?
            </span>
            <Link to={'/login'}><button className="checkoutAuthButton">Log In</button></Link>
          </div>
          <div className="checkoutSignup">
            <span>Want to create an account?</span>
            <Link to={'/signup'}><button className="checkoutAuthButton">Sign Up</button></Link>
          </div>
        </div>
      </div>

      <div className="checkoutMain">
        <div className="checkoutCart">
          {cart && cart.length ? cart.map((item) => {
            return (
              <div className="checkoutProductContainer" key={item.product.id}>
                <h2 className="productName">{item.product.name}</h2>
                <h2 className="productPrice">${item.product.price}</h2>
                <h2 className="productQty">Qty: {item.quantity}</h2>
                <img src={item.product.imageUrl} />
                <button onClick={() => {
                  decreaseQty(item)
                }}>-</button>
                <small>{item.quantity}</small>
                <button onClick={() => {
                  increaseQty(item)
                }}>+</button>
              </div>
            )
          }
          )
            : "No Items in Cart"
          }
        </div>
        <div className="checkoutPayment">
          <form className="checkoutForm">
            <h1>Payment Info</h1>
            <div>
              <label htmlFor="name">Billing Name</label>
              <input name="name" type="text" placeholder="Billing Name"></input>
            </div>
            <div>
              <label htmlFor="billingAddress">Billing Address</label>
              <input name="billingAddress" type="text" placeholder="Billing Address"></input>
            </div>
            <div>
              <label htmlFor="creditCard">Credit Card Info</label>
              <input name="creditCard" type="text" placeholder="Last 4 of Credit Card"></input>
            </div>
            <button className="checkoutButton">SUBMIT ORDER</button>
          </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default Checkout;
