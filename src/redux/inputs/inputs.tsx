import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LetterType } from "./types";

export interface InitialState {
  existsInArray: {
    gray: boolean;
    yellow: boolean;
  };
  gray_letters: string;
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
  gray_letters: "",
  green_letters: [
    {
      value: null,
      postion: -1,
    },
  ],
  yellow_letters: [
    {
      value: null,
      postion: -1,
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

      if (type === "green") {
        // can have repeted values
        state.green_letters.push({
          postion: position,
          value: value,
        });
      } else {
        // no repeted values
        if (state.yellow_letters.find((item) => item.postion === position)) {
          const item = state.yellow_letters.find(
            (item) => item.postion === position
          );
          item!.value = value;
        }
        if (!state.yellow_letters.find((item) => item.value === value)) {
          state.yellow_letters.push({
            postion: position,
            value: value,
          });
        }
      }
    },
    addGrayLetters: (state, payload: PayloadAction<string>) => {
      const { payload: grayLetters } = payload;
      const isInGreen =
        state.green_letters[0].value !== null &&
        state.green_letters.map((letter) => grayLetters.includes(letter.value!))
          ? true
          : false;
      const isInYellow =
        state.yellow_letters[0].value !== null &&
        state.yellow_letters.map((letter) =>
          grayLetters.includes(letter.value!)
        )
          ? true
          : false;

      if (!isInGreen && !isInYellow) {
        state.gray_letters = payload.payload;
      }
    },
  },
});

export const { addInput, addGrayLetters } = inputsSlice.actions;
export default inputsSlice.reducer;
