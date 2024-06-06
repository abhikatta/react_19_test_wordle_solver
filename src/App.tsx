import { addInput } from "./redux/inputs/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LetterType } from "./redux/types";
import { AppDispatch, RootState } from "./redux/store";
import Results from "./Results";
import { useEffect, useState } from "react";
import { fetchWordsData, setAllFiltered } from "./redux/words/words";
import { TheForm } from "./components/Form";
import { Submit } from "./utils/utils";

const App = () => {
  // const [grayLettersInput, setGrayLettersInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { gray_letters, green_letters, yellow_letters } = useSelector(
    (state: RootState) => state.inputs
  );
  const { words: defaultWords, fetchingData } = useSelector(
    (state: RootState) => state.words
  );

  const [currentInputPosition, setCurrentInputPosition] = useState<number>(0);
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

  // const Submit = async () => {
  //   let filteredWords: string[] = wordsList.words;
  //   // gray words filteration:
  //   const grayLetters = gray_letters.length > 0 ? gray_letters.split("") : [];
  //   if (grayLetters.length > 0) {
  //     filteredWords = filteredWords.filter((word) => {
  //       return !grayLetters.some((letter) => word.includes(letter));
  //     });
  //   }
  //   // yellowwords filteration:
  //   const yellowLetters = yellow_letters.length > 0 ? yellow_letters : [];
  //   const isYellowNotNull = yellowLetters.some((item) => item.value !== "");
  //   if (isYellowNotNull) {
  //     filteredWords = filteredWords.filter((word) => {
  //       return yellowLetters.every((letter) => word.includes(letter.value));
  //     });
  //   }

  //   // green words filteration:
  //   const greenLetters = green_letters.length > 0 ? green_letters : [];
  //   const isGreenNotNull = greenLetters.some((item) => item.value === "");
  //   if (!isGreenNotNull) {
  //     filteredWords = filteredWords.filter((word) => {
  //       return greenLetters.every(
  //         (letter) => word[letter.position - 1] === letter.value
  //       );
  //     });
  //   }

  //   dispatch(setAllFiltered(filteredWords));
  // };

  useEffect(() => {
    dispatch(fetchWordsData());
  }, [dispatch]);

  useEffect(() => {
    const inputs = document.getElementsByName("letter");
    let i = currentInputPosition;
    inputs.forEach((inp) => {
      inp.oninput = () => inputs[i + 1] && inputs[(i += 1)].focus();
    });
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
                setCurrentInputPosition={setCurrentInputPosition}
              />
            </div>
          </div>
          <button
            className="text-white bg-slate-500 px-4 py-2 rounded-md hover:px-6  transition-all duration-200"
            onClick={() =>
              handleSubmit(
                Submit(
                  defaultWords,
                  gray_letters,
                  green_letters,
                  yellow_letters
                )
              )
            }>
            Submit
          </button>
        </>
      )}
      <Results />
    </div>
  );
};

export default App;
