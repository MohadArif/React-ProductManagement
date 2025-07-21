import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Nav() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");

  const logoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("jwtToken");
    toast.success("logout successfull..");
    navigate("/");
  };
  return (
    <nav className="w-full h-[50px] bg-black flex justify-between items-center px-6">
      <h2 className="text-white text-2xl font-bold">PM</h2>

      <ul className="flex gap-6 text-white items-center list-none pt-2">
        <li>
          <Link to="/" className="no-underline text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/CreateProduct" className="no-underline text-white">
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/ProductList" className=" tex no-underline text-white">
            Show Product
          </Link>
        </li>
        {token ? (
          <li className="btn btn-primary mt-2" onClick={logoutHandler}>
            <Link to="/Signup" className="text-white">
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li className="btn btn-primary mt-2">
              <Link to="/Signup" className="text-white">
                SignUp
              </Link>
            </li>
            <li className="btn btn-primary mt-2">
              <Link to="/Login" className="text-white">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
