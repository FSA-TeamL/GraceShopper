import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./slices/allCartSlice";
import { fetchProductsAsync, selectProducts } from "./slices/allProductsSlice";
import { addToCartAsync } from "./slices/cartSlice";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const [cartItemId, setCartItemId] = useState(null)
  const [cartId, setCartId] = useState(null);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.me);

  const {shoppingCartId} = useParams();

  // const addToCart = async () => {
  //   dispatch(addToCartAsync(shoppingCartId)).then((res) => {
  //     const { name, address } = res.payload;
  //     setName(name);
  //     setAddress(address);
  //   });
  // }

  return (
    <>
      <h1 className="pageTitle">Products</h1>
      <div className="products">
        {products.map((product) => {
          return (
            <div className="productContainer" key={product.id}>
              <h2 className="productName">{product.name}</h2>
              <h2 className="productPrice">${product.price}</h2>
              <img src={product.imageUrl} />
              <div className="productButtonContainer">
                <button
                  className="productButton"
                  onClick={()=>{
                    console.log(product.name)
                  }}
                >
                  Add To Cart
                </button>
                <button className="productButton">Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
