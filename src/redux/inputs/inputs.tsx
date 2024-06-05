import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, PayloadType } from "./types";

const initialState: InitialState = {
  existsInArray: {
    gray: false,
    yellow: false,
  },
  gray_letters: "",
  green_letters: [
    {
      value: "",
      postion: 1,
    },
    {
      value: "",
      postion: 2,
    },
    {
      value: "",
      postion: 3,
    },
    {
      value: "",
      postion: 4,
    },
    {
      value: "",
      postion: 5,
    },
  ],
  yellow_letters: [
    {
      value: "",
      postion: 1,
    },
    {
      value: "",
      postion: 2,
    },
    {
      value: "",
      postion: 3,
    },
    {
      value: "",
      postion: 4,
    },
    {
      value: "",
      postion: 5,
    },
  ],
};

const inputsSlice = createSlice({
  name: "inputs",
  initialState: initialState,
  reducers: {
    addInput: (state, payload: PayloadAction<PayloadType>) => {
      const {
        type: letterType,
        value: letterValue,
        position: letterPosition,
      } = payload.payload;
      if (letterType === "green") {
        const item = state.green_letters.find(
          (item) => item.postion === letterPosition
        );
        if (item) {
          item.value = letterValue;
        }
      } else if (letterType === "yellow") {
        const item = state.yellow_letters.find(
          (item) => item.postion === letterPosition
        );
        const isRepeated = state.yellow_letters.find(
          (item) => item.value === letterValue
        );
        if (item && !isRepeated) {
          item.value = letterValue;
        }
      }
    },
    addGrayLetters: (state, payload: PayloadAction<string>) => {
      const { payload: grayLetters } = payload;
      const isInGreen =
        state.green_letters[0].value !== "" &&
        state.green_letters.map((letter) => grayLetters.includes(letter.value!))
          ? true
          : false;
      const isInYellow =
        state.yellow_letters[0].value !== "" &&
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
