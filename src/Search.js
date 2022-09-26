import React, { useContext } from "react";
import "./App.css";
import { AppContext } from "./context";

const Search = () => {
  const { query, setQuery, isError, searchData } = useContext(AppContext);
  console.log(query, "query");
  return (
    <section className="search-section">
      <h2>Search Your Favourite Anime</h2>
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder="Search anime here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/*<i className="fa-solid fa-magnifying-glass search" onClick={(e)=>searchData(query)}></i> */}
        </div>
      </form>
      <div className="card-error">
        <p>{isError.show && isError.msg}</p>
      </div>
    </section>
  );
};

export default Search;

