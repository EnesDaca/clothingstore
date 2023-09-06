import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import LandingPage from "./components";
import ProductDetails from "./components/Product/productDetails";

function App() {
  return (
    <>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
