import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components";
import Login from "./components/Login";
import Layout from "./components/Layout";
import ProductDetails from "./components/Product/productDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <section>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/viewcart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </section>
    </>
  );
}

export default App;
