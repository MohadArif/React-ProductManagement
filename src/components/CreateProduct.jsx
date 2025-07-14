import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateProduct() {
  const naviage = useNavigate();
  const { id } = useParams(); // Get product ID from URL if updating
  const Base_url = "http://localhost:8080/product";
  const [product, setProduct] = useState({
    productName: "",
    productBrand: "",
    price: "",
  });

  // fetching the details by id
  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await axios.get(`${Base_url}/${id}`);
        setProduct(response.data);
        console.log("fetch data by id :", response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchById();
  }, []);

  const inputHandler = (element) => {
    const { name, value } = element.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const postHandler = async () => {
    try {
      if (id) {
        const response = await axios.put(`${Base_url}/update`, product); //update logic
      } else {
        const response = await axios.post(`${Base_url}/save`, product); //create logic
        console.log(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
    naviage("/Table");
  };

  return (
    <div className="container align-content-center w-50 border border-2 p-5">
      <h2>product form</h2>
      <hr />
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="product name"
          name="productName"
          value={product.productName}
          onChange={inputHandler}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Product Brand
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="brand"
          name="productBrand"
          value={product.productBrand}
          onChange={inputHandler}
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          price
        </label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="price"
          name="price"
          value={product.price}
          onChange={inputHandler}
        />
      </div>
      <button className="btn btn-primary" onClick={postHandler}>
        save
      </button>
    </div>
  );
}

export default CreateProduct;
