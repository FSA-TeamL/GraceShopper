import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleProductAsync,
  addProductAsync,
  selectSingleProduct,
} from "../slices/singleProductSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectSingleProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] = useState("");

  const handleAdd = async (evt) => {
    evt.preventDefault();
    const newProduct = { name, description, price, imageurl };
    console.log("this is the new product on the add product component", newProduct)
    await dispatch(addProductAsync(newProduct));
    navigate("/products");
  };


  return (
    <>
      <h2>Add New Product Information: </h2>
      <form id="addForm" onSubmit={handleAdd}>
        <label htmlFor="addProduct">Name: </label>
        <input
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="addProduct">Description: </label>
        <input
          description="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="addProduct">ImageUrl: </label>
        <input
          imageurl="imageurl"
          value={imageurl}
          onChange={(e) => setImageurl(e.target.value)}
        />
        <label htmlFor="addProduct">Price: </label>
        <input
          price="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="addProductButton">
          Submit{" "}
        </button>
      </form>
    </>
  );
};

export default AddProduct;
