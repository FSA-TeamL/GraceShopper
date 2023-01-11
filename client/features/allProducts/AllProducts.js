import React from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../slices/allProductsSlice";

const AllProducts = () => {
  const products = useSelector(selectProducts);

  return (
    <>
      <div>Products</div>
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
