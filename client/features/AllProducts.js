import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, selectProducts } from "./slices/allProductsSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

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
                <button className="productButton">Add To Cart</button>
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
