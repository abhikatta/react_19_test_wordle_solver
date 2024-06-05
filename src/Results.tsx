import { useDispatch, useSelector } from "react-redux";

import { API_URl } from "./constants";
import { useEffect } from "react";
import { setWords } from "./redux/words/words";
import { RootState } from "./redux/store";

const Results = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.inputs);
  console.log(state);

  const fetchDataFromApi = async () => {
    try {
      const res = await fetch(API_URl);
      const data = await res.text();
      const words = data.split("\n");
      dispatch(setWords(words));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <div>
      <p>results:</p>
    </div>
  );
};

export default Results;
