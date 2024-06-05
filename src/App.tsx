import { addGrayLetters, addInput } from "./redux/inputs/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LetterType } from "./redux/types";
import { AppDispatch, RootState } from "./redux/store";
import Results from "./Results";
import { useEffect, useState } from "react";
import { setGrayFiltered } from "./redux/words/words";

const App = () => {
  const [grayLettersInput, setGrayLettersInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const inputState = useSelector((state: RootState) => state.inputs);
  const [currentInputPosition, setCurrentInputPosition] = useState<number>(0);
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

  const Submit = async () => {
    dispatch(addGrayLetters(grayLettersInput));
  };

  useEffect(() => {
    const inputs = document.getElementsByName("letter");
    let i = currentInputPosition;
    inputs.forEach((inp) => {
      inp.oninput = () => inputs[i + 1] && inputs[(i += 1)].focus();
    });
  });

  useEffect(() => {
    const gray_letters = inputState.gray_letters.split("");
    const filteredGrayWords: string[] = [];
    gray_letters.length > 0 &&
      wordsList.words.forEach((word) => {
        const includesGrayLetter = gray_letters.some((letter) =>
          word.includes(letter)
        );
        if (!includesGrayLetter) {
          filteredGrayWords.push(word);
        }
      });
    dispatch(setGrayFiltered(filteredGrayWords));
  }, [dispatch, inputState.gray_letters, wordsList.words]);

  return (
    <div className=" min-h-screen h-full w-full bg-slate-600 flex flex-col justify-center items-center gap-5">
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
                    onFocus={(e) => {
                      e.target.select();
                      setCurrentInputPosition(index);
                    }}
                    name="letter"
                    onChange={(e) =>
                      onChange("green", e.target.value, index + 1)
                    }
                    maxLength={1}
                    className="w-[3rem] h-[3rem] text-center bg-green-700 rounded-md outline-none border-none text-white uppercase"
                  />
                )}
                {index >= 5 && index < 10 && (
                  <input
                    onFocus={(e) => {
                      e.target.select();
                      setCurrentInputPosition(index);
                    }}
                    name="letter"
                    maxLength={1}
                    onChange={(e) =>
                      onChange("yellow", e.target.value, index + 1)
                    }
                    className="w-[3rem] h-[3rem] text-center bg-yellow-400 rounded-md outline-none border-none text-black uppercase"
                  />
                )}
              </div>
            );
          })}
          <input
            maxLength={26}
            type="text"
            onChange={(e) => setGrayLettersInput(e.target.value)}
            className=" w-[25rem] h-[3rem] font-bold text-xl text-center bg-slate-700 rounded-md outline-none border-none text-white uppercase"
            name="gray_letters"
          />
        </div>
      </div>
      <button
        className="text-white bg-slate-500 px-4 py-2 rounded-md hover:px-6  transition-all duration-200"
        onClick={Submit}>
        Submit
      </button>

      <Results />
    </div>
  );
};

export default App;
