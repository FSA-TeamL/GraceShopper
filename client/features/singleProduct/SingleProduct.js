import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "../slices/singleProductSlice";
import {
  fetchProductsAsync,
  selectProducts,
  addProductAsync,
} from "../slices/allProductsSlice";
import EditProduct from "../editProduct/EditProduct";
import {
  fetchCartAsync,
  addToCartAsync,
  adjustQtyAsync,
  selectCart,
} from "../slices/cartSlice";
import { addToCart } from "../slices/allCartSlice";

const SingleProduct = () => {
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  let cart = useSelector(selectCart);
  const { productId } = useParams();

  console.log("SINGLE PRODUCT COMPONENT", product);
  console.log("user", user);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
    dispatch(fetchCartAsync(user.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartAsync(user.id));
  }, [user]);

  const addToUserCart = async (product) => {
    console.log("This is cart", cart);
    console.log("This is product", product);

    // if product.id === cart.item.product.id is already in the Object, then increase quantity
    for (let i = 0; i < cart.length; i++) {
      let item = { ...cart[i] };
      console.log("the cart item", item);
      if (item.productId === product.id) {
        item.quantity++;
        return dispatch(adjustQtyAsync(item));
      }
    }

    // else push to cart
    let quantity = 1;
    let cartId = user.cartId;
    let productId = product.id;
    dispatch(addToCartAsync({ quantity, cartId, productId }));
  };

  return (
    <>
      <img className="productImage" src={product.imageUrl} />
      <div>
        <div>{product.name}</div>
        <div>${product.price}</div>
        <div>{product.description}</div>
      </div>
      {isLoggedIn ? (<button
        className="productButton"
        onClick={() => {
          addToUserCart(product);
        }}
      >
        User Add To Cart
      </button>) : (<button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>)}
      <div className="singleProductContainer">
        <h1 className="productName">{product.name}</h1>
        <div className="singleImage">
          <img src={product.imageUrl} width="300" height="300" />
          <div className="singleDescription">
            <h3>{product.description}</h3>
            <h2>${product.price}</h2>
            {isLoggedIn ? (
              <button
                className="productButton"
                onClick={() => {
                  addToUserCart(product);
                }}
              >
                Add To Cart
              </button>
            ) : (
              <button className="productButton" onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
            )}

            {user && user.isAdmin === true ? <EditProduct /> : <div></div>}
          </div>
        </div>


      </div>
    </>
  );
};

export default SingleProduct;
