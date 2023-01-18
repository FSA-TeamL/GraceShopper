import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../slices/allProductsSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] = useState("");

  const handleAdd = async (evt) => {
    evt.preventDefault();
    const newProduct = { name, description, price, imageurl };
    await dispatch(addProductAsync(newProduct));
    navigate("/products")
  };

  // useEffect(() => {
  //   setName = "";
  //   setDescription = "";
  //   setPrice = ""
  //   setImageurl = ""
  // }, [dispatch]);

  //if the values in each input are empty/null then the submit button will give an alert



  return (
    <>
      <h2>Add New Product Information: </h2>
      <form id="editForm" onSubmit={handleAdd}>
        <label htmlFor="addProduct">Name: </label>
        <input
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required="required"
        />
        <label htmlFor="addProduct">Description: </label>
        <input
          description="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required="required"
        />
        <label htmlFor="addProduct">ImageUrl: </label>
        <input
          imageurl="imageurl"
          value={imageurl}
          onChange={(e) => setImageurl(e.target.value)}
          required="required"
        />
        <label htmlFor="addProduct">Price: </label>
        <input
          price="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required="required"
        />
        <button type="submit" className="editProductButton" onClick={()=> alert("Product Added!")}>
          Submit{" "}
        </button>
      </form>
    </>
  );
};

export default AddProduct;
