import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialWordsState {
  words: string[];
  grayFilteredWords: string[];
}
const initialWordsState: InitialWordsState = {
  words: [],
  grayFilteredWords: [],
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
  },
});
export const { setWords, setGrayFiltered } = wordsListSlice.actions;

export default wordsListSlice.reducer;
