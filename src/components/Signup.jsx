import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const naviget = useNavigate();
  const BaseUrl = "http://localhost:8080/auth";
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
    roles: "USER",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/signup`, signupData);
      if (response.status == 201) {
        console.log(response.data);
        toast.success("registration successfull..");
        naviget("/Login");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please enter valid details");
      }
    }
  };

  //  const signup = document.getElementById("signup");
  //  signup.style.display = "none";

  return (
    <div>
      <div className="signup-container bg-white border-2 rounded-2xl w-[400px] h-[300px] mx-110">
        <div className="signup-form flex flex-col mx-2 items-center">
          <h2 className="text-center my-2">Create Account</h2>
          <div className="flex justify-between items-center">
            <label htmlFor="exampleFormControlInput1" className="mx-2">
              usename :
            </label>
            <input
              className="px-10 my-2 outline-0"
              type="text"
              name="userName"
              placeholder="Username"
              required
              value={signupData.userName}
              onChange={changeHandler}
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="exampleFormControlInput1" className="mx-2 pl-7 ">
              email :
            </label>
            <input
              className="px-10 my-2 outline-0"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={signupData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="exampleFormControlInput1" className="mx-2">
              password :
            </label>
            <input
              className="px-10 my-2 outline-0 "
              type="password"
              name="password"
              placeholder="Password"
              required
              value={signupData.password}
              onChange={changeHandler}
            />
          </div>

          <button
            id="signup"
            onClick={submitHandler}
            className="btn btn-success my-3 w-[100px] text-center items-center"
          >
            Sign Up
          </button>
          <p className="login-link mx-3">
            Already have an account?
            <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
