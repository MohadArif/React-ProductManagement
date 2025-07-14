import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "./components/Table";
import CreateProduct from "./components/CreateProduct";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Table />} />
            <Route path="Table" element={<Table />} />
            <Route path="CreateProduct" element={<CreateProduct />} />
            <Route path="CreateProduct/:id" element={<CreateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
