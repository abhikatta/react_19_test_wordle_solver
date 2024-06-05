import { addGrayLetters, addInput } from "./redux/inputs/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LetterType } from "./redux/inputs/types";
import { AppDispatch, RootState } from "./redux/store";
import Results from "./Results";
import { setGrayFiltered } from "./redux/words/words";
import { useEffect, useState } from "react";

const App = () => {
  const [grayLetters, setGrayLetters] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const inputLetters = useSelector((state: RootState) => state.inputs);
  const wordsList = useSelector((state: RootState) => state.words);
  const onChange = (
    letterType: LetterType,
    letterValue: string,
    letterPosition: number = 0
  ) => {
    dispatch(
      addInput({
        type: letterType,
        value: letterValue,
        position: letterType === "yellow" ? letterPosition - 5 : letterPosition,
      })
    );
  };

  const Submit = () => {
    dispatch(addGrayLetters(grayLetters));
  };

  useEffect(() => {
    console.log(inputLetters.yellow_letters);
  });

  return (
    <div className="h-screen w-screen bg-slate-600 flex flex-col justify-center items-center gap-5">
      <div className="w-[25rem] h-auto flex flex-col justify-center items-center">
        <ol className="text-white my-5">
          <li className="list-disc">
            Please Make sure that the letters in yellow boxes or gray input
            field are not repeated in other yellow boxes or the gray input field
          </li>
          <li className="list-disc">
            Letters in green boxes can be repeated, but only in other green
            boxes.
          </li>
          <li className="list-disc">
            Pleae make sure that if a letter exists in green or yellow box, it
            CAN'T exist in the gray box or vice versa.
          </li>
        </ol>
        <div className="grid h-auto gap-9 grid-cols-5 grid-rows-2 justify-center items-center">
          {Array.from({ length: 15 }).map((_, index) => {
            return (
              <div key={index} className=" font-extrabold text-xl">
                {index < 5 && (
                  <input
                    onChange={(e) =>
                      onChange("green", e.target.value, index + 1)
                    }
                    maxLength={1}
                    className="w-[3rem] h-[3rem] text-center bg-green-700 rounded-md outline-none border-none text-white"
                  />
                )}
                {index >= 5 && index < 10 && (
                  <input
                    maxLength={1}
                    onChange={(e) =>
                      onChange("yellow", e.target.value, index + 1)
                    }
                    className="w-[3rem] h-[3rem] text-center bg-yellow-400 rounded-md outline-none border-none text-black"
                  />
                )}
              </div>
            );
          })}
          <input
            maxLength={26}
            onChange={(e) => setGrayLetters(e.target.value)}
            className=" w-[25rem] h-[3rem] text-center bg-slate-700 rounded-md outline-none border-none text-white"
            name="gray_letters"
          />
        </div>
      </div>
      <button onClick={Submit}>Submit</button>

      <Results />
    </div>
  );
};

export default App;
