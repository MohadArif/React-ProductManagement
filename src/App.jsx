import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "./components/CreateProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="ProductList" element={<ProductList />} />
            <Route path="CreateProduct" element={<CreateProduct />} />
            <Route path="CreateProduct/:id" element={<CreateProduct />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
