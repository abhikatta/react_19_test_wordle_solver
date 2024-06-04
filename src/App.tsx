import { useActionState, useState } from "react";
import { addInput } from "./redux/inputs/inputs";
import { useDispatch } from "react-redux";
import { LetterType } from "./redux/inputs/types";

const App = () => {
  const [pendingAlphabetsCount, setPendingAlphabetsCount] = useState<number>(0);
  const dispatch = useDispatch();
  const onSubmit = (_: any | null, formData: FormData) => {
    Array.from({ length: 5 }).map((_, index) => {
      formData?.get(`G_L${index + 1}`) ||
        setPendingAlphabetsCount((prevCount) => prevCount + 1);
      formData?.get(`Y_L${index + 1}`) ||
        setPendingAlphabetsCount((prevCount) => prevCount + 1);
      formData?.get("gray_letters") ||
        setPendingAlphabetsCount((prevCount) => prevCount + 1);
    });
  };

  const [error, submitAction] = useActionState(onSubmit, null);
  const onChange = (
    letterType: LetterType,
    letterValue: string,
    letterPosition?: number
  ) => {
    dispatch(
      addInput({
        type: letterType,
        value: letterValue,
        position: letterPosition,
      })
    );
  };

  error && <p>{error}</p>;
  return (
    <form
      className="h-screen w-screen bg-slate-600 flex flex-col justify-center items-center gap-5"
      action={submitAction}>
      <div className="w-[25rem] h-auto flex flex-col justify-center items-center">
        <div className="grid h-auto gap-9 grid-cols-5 grid-rows-2 justify-center items-center">
          {Array.from({ length: 15 }).map((_, index) => {
            return (
              <div key={index}>
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
            maxLength={26 - pendingAlphabetsCount}
            onChange={(e) => onChange("gray", e.target.value)}
            className=" w-[25rem] h-[3rem] text-center bg-slate-700 rounded-md outline-none border-none text-white"
            name="gray_letters"></input>
        </div>
        <p>{pendingAlphabetsCount}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
