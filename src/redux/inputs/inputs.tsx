import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialInputState, InputPayloadType } from "../types";

const initialState: InitialInputState = {
  gray_letters: "",
  green_letters: [
    { value: "", position: 1 },
    { value: "", position: 2 },
    { value: "", position: 3 },
    { value: "", position: 4 },
    { value: "", position: 5 },
  ],
  yellow_letters: [
    { value: "", position: 1 },
    { value: "", position: 2 },
    { value: "", position: 3 },
    { value: "", position: 4 },
    { value: "", position: 5 },
  ],
};

const inputsSlice = createSlice({
  name: "inputs",
  initialState: initialState,
  reducers: {
    addInput: (state, payload: PayloadAction<InputPayloadType>) => {
      payload.payload = {
        ...payload.payload,
        value: payload.payload.value.trim(),
      };
      const {
        type: letterType,
        value: letterValue,
        position: letterPosition,
      } = payload.payload;
      if (letterType === "green") {
        const item = state.green_letters.find(
          (item: InitialInputState["green_letters"][0]) =>
            item.position === letterPosition
        );
        if (item) {
          item.value = letterValue;
        }
      } else if (letterType === "yellow") {
        const item = state.yellow_letters.find(
          (item: InitialInputState["yellow_letters"][0]) =>
            item.position === letterPosition
        );
        if (item) {
          item.value = letterValue;
        }
      }
    },
    addGrayLetters: (state, payload: PayloadAction<string>) => {
      state.gray_letters = payload.payload.trim();
    },
  },
});

export const { addInput, addGrayLetters } = inputsSlice.actions;
export default inputsSlice.reducer;
