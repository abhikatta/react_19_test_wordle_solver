import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Results = () => {
  const state = useSelector((state: RootState) => state.words);

  return state && state.allWords.length > 0 ? (
    <div className="flex flex-col items-center justify-center">
      <p className="text-white">
        Not sure but one of these might be what you're probably looking for:
      </p>
      <div className="grid grid-cols-10">
        {state.allWords.slice(0, 35).map((word, index) => (
          <p
            key={index}
            className="bg-slate-800 text-white text-center rounded-md mx-2 my-1 px-2 py-1">
            {word}
          </p>
        ))}
      </div>
      {state.allWords.length - 35 > 0 ? (
        <p className="  text-white text-center ">
          and {state.allWords.length - 35} others
        </p>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Results;
