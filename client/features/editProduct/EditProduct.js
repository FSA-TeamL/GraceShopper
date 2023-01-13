import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProductAsync, editProductAsync, selectSingleProduct } from "../slices/singleProductSlice";
import { useParams } from "react-router-dom";


const EditProduct = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const updatedProduct = { productId, name, description, price, imageUrl };
    await dispatch(editProductAsync(updatedProduct));
  };

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId)).then((res) => {
      const { name, description, price, imageUrl } = res.payload;
      setName (name);
      setDescription (description);
      setPrice (price);
      setImageUrl (imageUrl);
    });
  }, [productId]);

  return (
    <>
      <h2>Edit Product Information: </h2>
      <form id="editForm" onSubmit={handleSubmit}>
        <label htmlFor="editProduct">Name: </label>
          <input
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <label htmlFor="editProduct">Description: </label>
          <input
              description="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        <label htmlFor="editProduct">ImageUrl: </label>
          <input
              imageUrl="ImageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
        <label htmlFor="editProduct">Price: </label>
          <input
              price="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
        <button type="submit" className="editProductButton">Submit </button>
      </form>
    </>
  );
};

export default EditProduct;
