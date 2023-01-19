import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/allCartSlice";
import {
  fetchProductsAsync,
  selectProducts,
  addProductAsync,
} from "../slices/allProductsSlice";
import {
  fetchCartAsync,
  addToCartAsync,
  adjustQtyAsync,
  selectCart,
} from "../slices/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddProduct from "../addProduct/AddProduct";

const AllProducts = () => {
  let products = useSelector(selectProducts);
  let user = useSelector((state) => state.auth.me);
  let { id } = useParams();
  let cart = useSelector(selectCart);

  // console.log("here is the user", user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCartAsync(user.id));
    console.log("allproducts useeffect dispatch - cart", cart)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartAsync(user.id));
  }, [user]);

  const addToUserCart = async (product) => {
    // if product.id === cart.item.product.id is already in the Object, then increase quantity
    for(let i=0; i<cart.length; i++){
      let item = {...cart[i]}
      console.log("the cart item", item)
      if(item.productId === product.id){
        item.quantity++
        return dispatch(adjustQtyAsync(item))
      }
    }

    // else push to cart
    let quantity = 1;
    let cartId = user.cartId;
    let productId = product.id;
    let imageUrl = product.imageUrl;
    return dispatch(addToCartAsync({ quantity, cartId, productId, imageUrl }));
  };

  return (
    <div className="allProductsBackground">
      {user && user.isAdmin === true ?  <AddProduct /> : <div></div>}
      <h1 className="pageTitle">Our Plants & More</h1>
      <div className="products">
        {products.map((product) => {
          return (
            <div className="productContainer" key={product.id}>
              <h2 className="productName">{product.name}</h2>
              <h2 className="productPrice">${product.price}</h2>
              <img className="productImage" src={product.imageUrl} />
              <div className="productButtonContainer">

                {isLoggedIn ? (<button
                  className="productButton"
                  onClick={() => {
                    addToUserCart(product);
                  }}
                >
                Add To Cart
                </button>) :
                 (<button className="productButton" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>)}


                  <button
                    className="productButton"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default AllProducts;
