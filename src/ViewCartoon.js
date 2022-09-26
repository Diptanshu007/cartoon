import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import ReactLoading from "react-loading";

const ViewCartoon = () => {
  const SINGLE_DATA_API_URL = `https://api.jikan.moe/v4/anime/`;
  const [isLoading, setIsLoading] = useState(true);
  const [singleData, setSingleData] = useState();
  const { id } = useParams();

  const getSingleCartoon = async (id) => {
    try {
      let data = await fetch(SINGLE_DATA_API_URL + `${id}`);
      let res = await data.json();
      if (res) {
        setIsLoading(false);
        setSingleData(res.data);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(console.error);
    }
  };
  useEffect(() => {
    getSingleCartoon(id);
  }, []);

  if (isLoading) {
    return (
      <div style={{ margin: "200px" }}>
        <ReactLoading
          className="text-center"
          type="bars"
          color="black"
          height={60}
          width={100}
        />
      </div>
    );
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          {singleData &&
          singleData.trailer &&
          singleData.trailer.embed_url == null ? (
            <figure>
              <img
                src={
                  singleData &&
                  singleData.images &&
                  singleData.images.jpg &&
                  singleData.images.jpg.large_image_url
                }
                alt=""
              />
            </figure>
          ) : (
            <iframe
              width="420"
              height="666"
              src={
                singleData && singleData.trailer && singleData.trailer.embed_url
              }
            ></iframe>
          )}

          <div className="card-content">
            <p className="title">{singleData.title}</p>
            <p className="card-text">
              <strong>Year :</strong>{" "}
              {singleData.year ? singleData.year : "N/A"}
            </p>
            <p className="card-text">
              <strong>Type : </strong> {singleData.type}
            </p>
            <p className="card-text">
              <strong>Genres : </strong>{" "}
              {singleData &&
              singleData.genres &&
              singleData.genres[0] &&
              singleData.genres[0].name
                ? singleData.genres[0].name
                : "N/A"}
            </p>
            <p style={{ fontSize: "12px" }} className="max-width">
              <strong>Synopsis : </strong>
              {singleData.synopsis}
            </p>
            <p className="card-text">
              <strong>Episodes : </strong>
              {singleData.episodes}
            </p>
            <p className="card-text">
              <strong>Duration :</strong> {singleData.duration}
            </p>
            <p className="card-text">
              <strong>Rank : </strong>#{singleData.rank}{" "}
            </p>
            <p className="card-text">
              <strong>Rating : </strong> {singleData.score} / 10
            </p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewCartoon;

