import { useDispatch } from "react-redux";
import { LetterType } from "../../redux/types";
import { addGrayLetters } from "../../redux/inputs/inputs";
import { Title } from "../../constants";

export const TheForm = ({
  setCurrentInputPosition,
  onChange,
  attempted,
}: {
  setCurrentInputPosition: (index: number) => void;
  onChange: (LetterType: LetterType, value: string, index: number) => void;
  attempted: boolean;
}) => {
  const dispatch = useDispatch();
  return (
    <>
      {Array.from({ length: 15 }).map((_, index) => {
        return (
          <div key={index} className=" font-extrabold text-xl">
            {index < 5 && (
              <input
                title={attempted ? Title.Attempted : ""}
                readOnly={attempted}
                onFocus={(e) => {
                  e.target.select();
                  setCurrentInputPosition(index);
                }}
                name="letter"
                onChange={(e) => onChange("green", e.target.value, index + 1)}
                maxLength={1}
                className="w-[3rem] h-[3rem] text-center bg-green-700 rounded-md outline-none border-none text-white uppercase"
              />
            )}
            {index >= 5 && index < 10 && (
              <input
                title={attempted ? Title.Attempted : ""}
                readOnly={attempted}
                onFocus={(e) => {
                  e.target.select();
                  setCurrentInputPosition(index);
                }}
                name="letter"
                maxLength={1}
                onChange={(e) => onChange("yellow", e.target.value, index + 1)}
                className="w-[3rem] h-[3rem] text-center bg-yellow-400 rounded-md outline-none border-none text-black uppercase"
              />
            )}
          </div>
        );
      })}
      <input
        title={attempted ? Title.Attempted : ""}
        readOnly={attempted}
        maxLength={26}
        type="text"
        onChange={(e) => dispatch(addGrayLetters(e.target.value))}
        className=" w-[25rem] h-[3rem] font-bold text-xl text-center bg-slate-700 rounded-md outline-none border-none text-white uppercase"
        name="grayLetters"
      />
    </>
  );
};
