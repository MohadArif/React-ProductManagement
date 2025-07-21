import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductList() {
  const navigate = useNavigate();
  const Base_Url = "http://localhost:8080/product";
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${Base_Url}/findAll`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProduct();
  }, []);

  const deleteHandler = (id) => {
    console.log("delete method entered");
    const deleteApi = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        console.log(token);
        const response = await axios.delete(`${Base_Url}/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          console.log("data deleted succesfully :", response.data);
          toast.success("product deleted..");
          // Update UI by removing deleted product from the list
          setProduct((prevProducts) =>
            prevProducts.filter((item) => item.id !== id)
          );
        }
      } catch (error) {
        console.error(error.message);
        toast.error("something wrong..");
      }
    };
    deleteApi();
  };

  const updateHandler = (id) => {
    navigate(`/CreateProduct/${id}`);
  };
  return (
    <div className="container">
      <h2>Product_Table</h2>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Product_Name</th>
            <th scope="col">Product_Brand</th>
            <th scope="col">price</th>
            <th scope="col">Update Action</th>
            <th scope="col">Delete Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((items) => (
            <tr key={items.id}>
              <th scope="row">{items.id}</th>
              <td>{items.productName}</td>
              <td>{items.productBrand}</td>
              <td>{items.price}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateHandler(items.id)}
                >
                  update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(items.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
