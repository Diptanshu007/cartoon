import { useContext } from "react";
import "./App.css";
import { AppContext } from "./context";

export default function Pagination() {
  const { finalNum, num, setNum } = useContext(AppContext)
  const getPrevData = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  const getNextData = (num) => {
    if (num < 50) {
      setNum(num + 1);
    }
  };
  return (
    <div className="pagination">
      <button onClick={(e) => getPrevData(num)}>Prev</button>
      <p>
        {num} of {finalNum}
      </p>
      <button onClick={(e) => getNextData(num)}>Next</button>
    </div>
  );
}

