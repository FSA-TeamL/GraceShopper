import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart, adjustQtyAsync } from '../slices/cartSlice'
import { useParams, Link } from 'react-router-dom';



const UserCheckout = () => {

  const user = useSelector((state) => state.auth.me);
  console.log("USER", user)
  const userCart = useSelector(selectCart);
  console.log("USER CART", userCart);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(id));
  }, [dispatch]);

  const getCartTotal = () => {
    let cartTotal = 0
    for (let i = 0; i < userCart.length; i++) {
      let itemTotal = userCart[i].product.price * userCart[i].quantity;
      cartTotal += itemTotal
    }
    return cartTotal
  }

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
            <h1>Shopping Cart</h1>
            <h2>Total: ${getCartTotal()}</h2>
            <Link to={`/usercart/${id}`}>
              <button className="editButton">EDIT CART</button>
            </Link>
            {userCart && userCart.length ? userCart.map((item) => {
              return (
                <div className="checkoutProductContainer" key={item.product.id}>
                  <h2 className="productName">{item.product.name}</h2>
                  <h2 className="productPrice">${item.product.price}</h2>
                  <h2 className="productQty">Qty: {item.quantity}</h2>
                  <img src={item.product.imageUrl} />
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

export default UserCheckout;
