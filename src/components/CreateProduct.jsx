import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProduct() {
  const navigate = useNavigate();
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
      if (!id) return;
      try {
        const token = sessionStorage.getItem("jwtToken");
        const response = await axios.get(`${Base_url}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
        console.log("fetch data by id :", response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchById();
  }, [id]);

  const inputHandler = (element) => {
    const { name, value } = element.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const postHandler = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("jwtToken");
      if (!token) {
        console.error("Token not found");
        toast.error("you must login");
        navigate("/Login");
        return;
      }
      if (id) {
        const response = await axios.put(`${Base_url}/update`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); //update logic
        if (response.status == 200) {
          toast.success("product updated succesfull");
          navigate("/ProductList");
        }
      } else {
        const response = await axios.post(`${Base_url}/save`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); //create logic
        console.log(response.data);
        if (response.status == 201) {
          toast.success("product saved");
          navigate("/ProductList");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials. Only ADMIN can update details.");
        navigate("/Login");
      }
      console.error(error.message);
    }
    // navigate("/ProductList");
  };

  return (
    <div className="container align-content-center w-50 border-2 p-5">
      <h2>product form</h2>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
        <label htmlFor="exampleFormControlInput1" className="form-label">
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
