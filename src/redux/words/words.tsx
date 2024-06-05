import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialWordsState } from "../types";

const initialWordsState: InitialWordsState = {
  words: [],
  grayFilteredWords: [],
  yellowFilteredWords: [],
  greenFilteredWords: [],
  allWords: [],
};
const wordsListSlice = createSlice({
  name: "words",
  initialState: initialWordsState,
  reducers: {
    setWords: (state, payload: PayloadAction<string[]>) => {
      state.words = payload.payload;
    },
    setGrayFiltered: (state, payload: PayloadAction<string[]>) => {
      state.grayFilteredWords = payload.payload;
    },
    setYellowFiltered: (state, payload: PayloadAction<string[]>) => {
      state.yellowFilteredWords = payload.payload;
    },
    setGreenFiltered: (state, payload: PayloadAction<string[]>) => {
      state.greenFilteredWords = payload.payload;
    },
    setAllFiltered: (state, payload: PayloadAction<string[]>) => {
      state.allWords = payload.payload;
    },
  },
});
export const {
  setWords,
  setGrayFiltered,
  setGreenFiltered,
  setYellowFiltered,
  setAllFiltered,
} = wordsListSlice.actions;

export default wordsListSlice.reducer;
