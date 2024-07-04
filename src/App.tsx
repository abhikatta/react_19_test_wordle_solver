import { addInput } from "./redux/inputs/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LetterType } from "./redux/types";
import { AppDispatch, RootState } from "./redux/store";
import Results from "./Results";
import { useEffect, useState } from "react";
import { fetchWordsData, setAllFiltered } from "./redux/words/words";
import { TheForm } from "./components/Form/Form";
import { Submit } from "./utils/utils";
import { UnknownAction } from "redux";
import { Analytics } from "@vercel/analytics/react";
import { pressedSubmit, resetSubmission } from "./utils/attemped";
import { Title, key } from "./constants";
import { dataType } from "./utils/types";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gray_letters, green_letters, yellow_letters } = useSelector(
    (state: RootState) => state.inputs
  );
  const { words: defaultWords, fetchingData } = useSelector(
    (state: RootState) => state.words
  );
  const [currentInputPosition, setCurrentInputPosition] = useState<number>(0);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const attempted: boolean = (
      JSON.parse(localStorage.getItem(key) as string) as dataType
    )?.isSubmitted;
    setAttempted(attempted);
  }, []);
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

  useEffect(() => {
    dispatch(fetchWordsData() as unknown as UnknownAction);
  }, [dispatch]);

  const isInputEmpty = () => {
    const isGrayEmpty = gray_letters.length <= 0;
    const isYellowEmpty = yellow_letters.every((item) => item.value === "");
    const isGreenEmpty = green_letters.every((item) => item.value === "");

    return isGrayEmpty && isYellowEmpty && isGreenEmpty ? true : false;
  };

  useEffect(() => {
    const inputs = document.getElementsByName("letter");
    let i = currentInputPosition;
    inputs.forEach((inp) => {
      inp.oninput = () => inputs[i + 1] && inputs[(i += 1)].focus();
    });
    isInputEmpty();
    resetSubmission();
  });

  const handleSubmit = (filteredWords: string[]) => {
    dispatch(setAllFiltered(filteredWords));
  };

  return (
    <div className=" min-h-screen h-full w-full bg-slate-600 flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl text-white ">BAD WORDLE SOLVER</h1>
      {fetchingData ? (
        <div>
          <p className="text-3xl text-white">Loading...</p>
        </div>
      ) : (
        <>
          <div className="w-[25rem] h-auto flex flex-col justify-center items-center">
            <ol className="text-white my-5">
              <li className="list-disc">
                Please Make sure that the letters in yellow boxes or gray input
                field are not repeated in other yellow boxes or the gray input
                field
              </li>
              <li className="list-disc">
                Letters in green boxes can be repeated, but only in other green
                boxes.
              </li>
              <li className="list-disc">
                Pleae make sure that if a letter exists in green or yellow box,
                it CAN'T exist in the gray box or vice versa.
              </li>
            </ol>
            <div className="grid h-auto gap-9 grid-cols-5 grid-rows-2 justify-center items-center">
              <TheForm
                onChange={onChange}
                attempted={attempted}
                setCurrentInputPosition={setCurrentInputPosition}
              />
            </div>
          </div>
          <button
            disabled={isInputEmpty() || attempted}
            title={
              attempted
                ? Title.Attempted
                : isInputEmpty()
                ? Title.EmptyInput
                : ""
            }
            className={`text-white bg-slate-500 px-4 py-2 rounded-md transition-all duration-200
              ${
                isInputEmpty() || attempted
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:px-6"
              }`}
            onClick={() => {
              handleSubmit(
                Submit(
                  defaultWords,
                  gray_letters,
                  green_letters,
                  yellow_letters
                )
              );
              pressedSubmit();
              setAttempted(true);
            }}>
            Submit
          </button>
          <Results />
        </>
      )}
      <Analytics />
    </div>
  );
};

export default App;
