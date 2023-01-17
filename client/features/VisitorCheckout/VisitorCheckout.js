import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from 'react-router-dom';



const visitorCheckout = () => {

  const visitorCart = useSelector((state) => state.cart2);

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
            <div className="checkoutCartHeader">
              <h1>Shopping Cart</h1>
              <h3>
                Total: ${Total().totalPrice}
              </h3>
              <Link to="/cart">
                <button className="editButton">EDIT CART</button>
              </Link>
            </div>
            {visitorCart?.map((item) => {
              return (
                <div className="checkoutProductContainer" key={item.id}>
                  <h2>{item.name}</h2>
                  <h4>${item.price}</h4>
                  <h4>Qty: {item.quantity}</h4>
                  <img src={item.imageUrl} />
                </div>
              )
            })}

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

export default visitorCheckout;
