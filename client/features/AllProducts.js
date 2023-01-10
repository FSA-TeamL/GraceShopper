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
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h2>${product.price}</h2>
              <img src={product.imageUrl} />
              <div>
                <button>Add To Cart</button>
                <button>Details</button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AllProducts;
