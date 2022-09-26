import React from "react";
import Cartoon from "./Cartoon";
import Pagination from "./Pagination";
import Search from "./Search";

const Home = () => {
  return (
    <>
      <Search />
      <Cartoon />
      <Pagination />
    </>
  );
};

export default Home;

