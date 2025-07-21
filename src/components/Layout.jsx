import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
  return (
    <div>
      <div className="mb-5">
        <Nav />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
