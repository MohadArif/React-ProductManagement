import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div>
      <div className="mb-5">
        <Header>
          <li>
            <Link to="/Table">Home</Link>
          </li>
          <li>
            <Link to="/CreateProduct">Add-Product</Link>
          </li>
        </Header>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
