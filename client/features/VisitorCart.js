import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem/CartItem'

const VisitorCart = () => {
    const cart = useSelector((state) => state.cart2)

  return (
  <div>
    <h3>Shopping Cart</h3>
    {cart?.map((product) => (
      <CartItem 
      key={product.id}
      item={product}
      />
  
    ))}
  </div>
    )
}

export default VisitorCart