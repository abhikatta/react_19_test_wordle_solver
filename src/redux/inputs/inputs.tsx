import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LetterType } from "./types";

export interface InitialState {
  existsInArray: {
    gray: boolean;
    yellow: boolean;
  };
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
  existsInArray: {
    gray: false,
    yellow: false,
  },
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
  position: number;
  type: LetterType;
}

const inputsSlice = createSlice({
  name: "inputs",
  initialState: initialState,
  reducers: {
    addInput: (state, payload: PayloadAction<PayloadType>) => {
      const { type, value, position } = payload.payload;

      state.existsInArray.gray = false;
      state.existsInArray.yellow = false;

      if (type === "gray") {
        // no repeted values
        if (state.gray_letters?.find((item) => item === value)) {
        } else {
          state.gray_letters?.push(value);
        }
      } else if (type === "green") {
        // can have repeted values
        state.green_letters.push({
          postion: position,
          value: value,
        });
      } else {
        // no repeted values
        if (state.yellow_letters.find((item) => item.value === value)) {
        } else {
          state.yellow_letters.push({
            postion: position,
            value: value,
          });
        }
      }
    },
  },
});

export const { addInput } = inputsSlice.actions;
export default inputsSlice.reducer;
