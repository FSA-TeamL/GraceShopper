import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "../slices/singleProductSlice";
import { addToCart } from "../slices/allCartSlice";

const SingleProduct = () => {
  const product = useSelector(selectSingleProduct);
  console.log("SINGLE PRODUCT COMPONENT", product);

  const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [dispatch]);

  return (
    <>
      <img src={product.imageUrl} />
      <div>
        <div>{product.name}</div>
        <div>${product.price}</div>
        <div>{product.description}</div>
      </div>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </>
  );
};

export default SingleProduct;
