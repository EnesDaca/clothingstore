import React from "react";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./MainContainer";
import ProductDetails from "./Product/productDetails";
import Cart from "./Cart/index";

const LandingPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContainer />} />
      </Routes>
    </>
  );
};

export default LandingPage;
