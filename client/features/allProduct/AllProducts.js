import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/allCartSlice";
import { fetchProductsAsync, selectProducts } from "../slices/allProductsSlice";
import { addToCartAsync } from "../slices/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import AddProduct from "../addProduct/AddProduct";

const AllProducts = () => {
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.me);

  const { id } = useParams();

  const addToUserCart = async (product) => {
    let quantity = 1;
    let cartId = user.cartId;
    let productId = product.id;
    dispatch(addToCartAsync({ quantity, cartId, productId }));
  };

  return (
    <>
      {user && user.isAdmin === true ?  <AddProduct /> : <div></div>}
      <h1 className="pageTitle">Products</h1>
      <div className="products">
        {products.map((product) => {
          return (
            <div className="productContainer" key={product.id}>
              <h2 className="productName">{product.name}</h2>
              <h2 className="productPrice">${product.price}</h2>
              <img src={product.imageUrl} />
              <div className="productButtonContainer">

                {isLoggedIn ? (<button
                  className="productButton"
                  onClick={() => {
                    addToUserCart(product);
                  }}
                >
                  Add To Cart
                </button>) : (<div>NOT LOGGED IN</div>)}


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
    </>
  );
};

export default AllProducts;
