import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cartoon from "./Cartoon";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import ViewCartoon from "./ViewCartoon";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/cartoon" element={<Home />} />{" "}
          <Route path="cartoon/:id" element={<ViewCartoon />} />{" "}
          <Route path="*" element={<ErrorPage />} />{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </>
  );
};

export default App;

