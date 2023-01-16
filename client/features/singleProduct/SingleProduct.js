import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductAsync, 
  selectSingleProduct,
} from "../slices/singleProductSlice";
import { addToCart } from "../slices/allCartSlice";
import EditProduct from "../editProduct/EditProduct";

const SingleProduct = () => {
  const product = useSelector(selectSingleProduct);
  console.log("SINGLE PRODUCT COMPONENT", product);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const { productId } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.me);

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
      {isLoggedIn ? (<div>LOGGED IN</div>) : (<button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>)}
<<<<<<< HEAD

=======
>>>>>>> 95486ba9de67734d3fd1f326be028de3ddc6fe13
      {user && user.isAdmin === true ? <EditProduct /> : <div></div>}
    </>
  );
};

export default SingleProduct;
