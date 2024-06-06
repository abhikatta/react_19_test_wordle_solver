import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useState } from "react";

const Results = () => {
  const [showLimit, setShowLimit] = useState<boolean>(true);
  const state = useSelector((state: RootState) => state.words);

  return state && state.allWords.length > 0 ? (
    <div className="flex flex-col items-center justify-center">
      <p className="text-white">
        Not sure but one of these might be what you're probably looking for:
      </p>
      <div className="grid grid-cols-10">
        {state.allWords
          .slice(0, showLimit ? 35 : undefined)
          .map((word, index) => (
            <p
              key={index}
              className="bg-slate-800 text-white text-center rounded-md mx-2 my-1 px-2 py-1">
              {word}
            </p>
          ))}
      </div>
      <div className=" flex flex-row my-5 gap-10">
        {state.allWords.length > 35 && showLimit ? (
          <>
            <p className="  text-white text-center ">
              and {state.allWords.length - 35} more..
            </p>
          </>
        ) : (
          <></>
        )}
        <button
          className="text-white bg-slate-500 px-4 py-2 rounded-md hover:px-5  transition-all duration-200"
          onClick={() => setShowLimit(!showLimit)}>
          Show {showLimit ? "More" : "Less"}?
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Results;
