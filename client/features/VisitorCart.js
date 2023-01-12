import React from 'react'
import { useSelector } from 'react-redux'

const VisitorCart = () => {
    const cart = useSelector((state) => state.cart2)

  return (
  <div>
    <h3>Shopping Cart</h3>
    {cart?.map((product) => (
      <div>{product.id}</div>
    ))}
  </div>
    )
}

export default VisitorCart