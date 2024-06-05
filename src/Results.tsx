import { useDispatch, useSelector } from "react-redux";

import { API_URl } from "./constants";
import { useEffect } from "react";
import { setWords } from "./redux/words/words";
import { RootState } from "./redux/store";

const Results = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.words.allWords);

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

  return state.length > 0 ? (
    <div className="flex flex-col items-center justify-center">
      <p className="text-white">
        Not sure but one of these might be what you're probably looking for:
      </p>
      <div className="grid grid-cols-10">
        {state.slice(0, 20).map((word, index) => (
          <p
            key={index}
            className="bg-slate-800 text-white text-center rounded-md mx-2 my-1 px-2 py-1">
            {word}
          </p>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Results;
