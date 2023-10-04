import React from "react";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./MainContainer";

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
