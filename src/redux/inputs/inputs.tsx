import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LetterType } from "./types";

export interface InitialState {
  existsInArray: boolean;
  gray_letters: string[] | null;
  green_letters: [
    {
      value: string | null;
      postion: number;
    }
  ];
  yellow_letters: [
    {
      value: string | null;
      postion: number;
    }
  ];
}

const initialState: InitialState = {
  existsInArray: false,
  gray_letters: [],
  green_letters: [
    {
      value: null,
      postion: 0,
    },
  ],
  yellow_letters: [
    {
      value: null,
      postion: 0,
    },
  ],
};

interface PayloadType {
  value: string;
  position?: number;
  type: LetterType;
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: initialState,
  reducers: {
    addInput: (state, payload: PayloadAction<PayloadType>) => {
      console.log(payload.payload);
      const letterType = payload.payload.type;
      const letterValue = payload.payload.value;
      const letterPosition = payload.payload.position || 0;

      if (letterType === "gray") {
        // no repeted values
        if (state.gray_letters?.includes(letterValue)) {
          state.existsInArray = true;
        } else {
          state.gray_letters?.push(letterValue);
        }
      } else if (letterType === "green") {
        // can have repeted values
        state.green_letters.push({
          postion: letterPosition,
          value: letterValue,
        });
      } else {
        // no repeted values
        if (state.yellow_letters.find((item) => item.value === letterValue)) {
          state.existsInArray = true;
        } else {
          state.yellow_letters.push({
            postion: letterPosition,
            value: letterValue,
          });
        }
      }
    },
  },
});

export const { addInput } = inputsSlice.actions;
export default inputsSlice.reducer;
