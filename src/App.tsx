import { addInput } from "./redux/inputs/inputs";
import { useDispatch, useSelector } from "react-redux";
import { LetterType } from "./redux/inputs/types";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.inputs);
  useEffect(() => {
    console.log(appState);
  });

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
                    name={`G_L${index + 1}`}></input>
                )}
                {index >= 5 && index < 10 && (
                  <input
                    maxLength={1}
                    onChange={(e) =>
                      onChange("yellow", e.target.value, index + 1)
                    }
                    className="w-[3rem] h-[3rem] text-center bg-yellow-400 rounded-md outline-none border-none text-black"
                    name={`Y_L${index - 4}`}></input>
                )}
              </div>
            );
          })}
          <input
            maxLength={26}
            onChange={(e) => onChange("gray", e.target.value)}
            className=" w-[25rem] h-[3rem] text-center bg-slate-700 rounded-md outline-none border-none text-white"
            name="gray_letters"></input>
        </div>
      </div>
      <button type="submit">Submit</button>
      {/* <div className="flex flex-row">
        {appState.green_letters.map((letter, index) => (
          <p className="text-white" key={index}>
            {letter.value}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default App;
