import React, { useContext } from "react";
import "./App.css";
import ReactLoading from "react-loading";
import { NavLink } from "react-router-dom";
import { AppContext } from "./context";
const imgUrl = "https://via.placeholder.com/200/200";

const Cartoon = () => {
  const {
    cartoonData,
    setCartoonData,
    isLoading,
    setAllData,
    query,
    genresData
  } = useContext(AppContext);
  const filterGenresData = (genres) => {
    let filteRes = [];
    cartoonData.map((curEle) => {
      curEle &&
        curEle.genres &&
        curEle.genres.filter((item) => {
          if (item.name === genres) {
            filteRes.push(curEle);
          }
        });
    });
    setCartoonData(filteRes);
  };
  if (isLoading) {
    return (
      <div>
        <ReactLoading
          className="text-center"
          type="bars"
          color="black"
          height={60}
          width={100}
        />{" "}
      </div>
    );
  }
  return (
    <>
      <section className="">
        <div className="genres-card-main">
          {" "}
          <div className="genres-card" onClick={(e) => setAllData(true)}>
            {" "}
            No Filter{" "}
          </div>{" "}
          {genresData &&
            genresData.map((ele) => {
              return (
                <div
                  className="genres-card"
                  onClick={(e) => filterGenresData(ele)}
                >
                  {" "}
                  {ele}{" "}
                </div>
              );
            })}{" "}
        </div>{" "}
      </section>{" "}
      <section className="movie-page">
        <div className="grid grid-4-col">
          {" "}
          {cartoonData
            ? cartoonData
                .filter((value) => {
                  if (query === "") {
                    return value;
                  } else if (
                    value.title.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return value;
                  }
                })

                .map((currCartoon) => {
                  const images =
                    currCartoon &&
                    currCartoon.images.jpg &&
                    currCartoon.images.jpg.image_url
                      ? currCartoon.images.jpg.image_url
                      : "Cartoon Image";
                  const { mal_id, score, title } = currCartoon;
                  const cartoonName = title.substring(0, 15);

                  return (
                    <NavLink to={`cartoon/${mal_id}`} key={mal_id}>
                      <>
                        <div className="card">
                          <div className="card-info">
                            <h2>
                              {" "}
                              {cartoonName.length > 13
                                ? `${title}...`
                                : cartoonName}{" "}
                            </h2>{" "}
                            <img
                              src={images === "N/A" ? imgUrl : images}
                              alt="#"
                            />
                            <div> {score}/ 10</div>
                          </div>{" "}
                        </div>{" "}
                        <div> </div>{" "}
                      </>{" "}
                    </NavLink>
                  );
                })
            : ""}{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
};

export default Cartoon;

