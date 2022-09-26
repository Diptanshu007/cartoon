import React, { useEffect, useState } from "react";

const AppContext = React.createContext();
const API_URL = `https://api.jikan.moe/v4/anime`;

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [num, setNum] = useState(1);
  const [allData, setAllData] = useState(false);
  const [genresData, setGenresData] = useState();
  const [filterGenres, seFilterGenres] = useState();
  const [finalNum, setFinalNum] = useState(1015);
  const [cartoonData, setCartoonData] = useState([]);
  const [query, setQuery] = useState("");
  const [isError, setIsError] = useState({
    show: false,
    errMsg: "",
  });
  let dataArr = [];
  const searchData = (data) => {
    cartoonData &&
      cartoonData.map((ele) => {
        if (ele.title.includes(data)) {
          dataArr.push(ele);
        }
        setCartoonData(dataArr);
      });
  };

  const getApiData = async (url) => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data) {
        setIsLoading(false);
        setAllData(false);
        setCartoonData(data.data);
        if (data && data.pagination) {
          setFinalNum(data.pagination.last_visible_page);
        }
      } else {
        setIsError({
          show: true,
          errMsg: data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGenersData = () => {
    let dataArr = [];
    cartoonData &&
      cartoonData.map((ele) => {
        ele.genres.map((item) => {
          dataArr.push(item.name);
        });
        setGenresData([...new Set(dataArr)]);
      });
  };

  useEffect(() => {
    getApiData(API_URL + `?page=${num}`);
    setIsLoading(true);
  }, [allData]);

  useEffect(() => {
    setIsLoading(true);
    getApiData(API_URL);
  }, []);

  useEffect(() => {
    getGenersData();
  }, [cartoonData]);

  useEffect(() => {
    setIsLoading(true);
    getApiData(API_URL + `?page=${num}`);
  }, [num]);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        isError,
        cartoonData,
        setCartoonData,
        query,
        setQuery,
        finalNum,
        num,
        setNum,
        searchData,
        genresData,
        seFilterGenres,
        filterGenres,
        setAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

