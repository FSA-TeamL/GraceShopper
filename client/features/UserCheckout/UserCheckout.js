import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync, selectCart } from '../slices/cartSlice'
import { Link } from 'react-router-dom';



const UserCheckout = () => {

  const userCart = useSelector(selectCart);
  const id = useSelector((state) => state.auth.me.cartId);
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
    return Math.round(cartTotal * 100) / 100;
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
            <div className="checkoutCartHeader">
              <h1>Shopping Cart</h1>
              <h3>Total: ${getCartTotal()}</h3>
              <Link to={`/usercart/${id}`}>
                <button className="editButton">EDIT CART</button>
              </Link>
            </div>
            {userCart && userCart.length ? userCart.map((item) => {
              return (
                <div className="checkoutProductContainer" key={item.product.id}>
                  <h2 className="checkoutProductName">{item.product.name}</h2>
                  <h4 className="checkoutProductPrice">${item.product.price}</h4>
                  <h4 className="checkoutProductQty">Qty: {item.quantity}</h4>
                  <img className="productImage" src={item.product.imageUrl} />
                </div>
              )
            }
            )
              : "No Items in Cart"
            }
          </div>

          <div className="checkoutPayment">
            <form className="checkoutForm">
              <h1 className="paymentHeader">Payment Info</h1>
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
