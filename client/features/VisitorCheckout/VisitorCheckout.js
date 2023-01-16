import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';


const visitorCheckout = () => {

  const visitorCart = useSelector((state) => state.cart2);
  console.log("VISITOR CART", visitorCart)

  const { id } = useParams();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCartAsync(id));
  // }, [dispatch]);

  const Total = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    visitorCart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
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
            <div>
              <h1>Shopping Cart</h1>
              <h2>
                Total: ${Total().totalPrice}
              </h2>
              <Link to="/cart">
                <button className="editButton">EDIT CART</button>
              </Link>
              {visitorCart?.map((item) => (
                <div key={item.id}>
                  <h2>{item.name}</h2>
                  <h2>${item.price}</h2>
                  <h2>Qty: {item.quantity}</h2>
                  <img src={item.imageUrl} />
                </div>
              ))}
            </div>

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
              <Link to="/confirmation">
                <button className="checkoutButton">SUBMIT ORDER</button>
              </Link>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default visitorCheckout;
