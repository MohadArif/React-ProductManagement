import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const BaseUrl = "http://localhost:8080/auth";
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/authenticate`, loginData);
      console.log(response.data);
      // alert(response.data.token);
      if (response.status == 200) {
        const token = sessionStorage.setItem("jwtToken", response.data.token);
        console.log(token);
        toast.success("login sucessful...");
        navigate("/ProductList");
      }
      // alert("login successfull..");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please check your email and password.");
      }
    }
  };
  return (
    <div>
      <div className="signup-container bg-white border-2 rounded-2xl w-[400px] h-[300px] mx-110">
        <div className="signup-form flex flex-col mx-2 items-center">
          <h2 className="text-center my-2">Login Account</h2>
          <div className="flex justify-between items-center">
            <label htmlFor="" className="mx-2 pl-7 ">
              email :
            </label>
            <input
              className="px-10 my-2 outline-0"
              type="email"
              name="username"
              placeholder="Email"
              required
              value={loginData.username}
              onChange={changeHandler}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="" className="mx-2">
              password :
            </label>
            <input
              className="px-10 my-2 outline-0 "
              type="password"
              name="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={changeHandler}
            />
          </div>

          <button
            onClick={submitHandler}
            className="btn btn-success my-3 w-[100px] text-center items-center"
          >
            login
          </button>
          <p className="login-link mx-3">
            Already have an account? <Link to="/Signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
