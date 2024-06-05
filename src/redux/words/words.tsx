import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialWordsState } from "../types";
import { API_URl } from "../../constants";

const initialWordsState: InitialWordsState = {
  words: [],
  fetchingData: false,
  grayFilteredWords: [],
  yellowFilteredWords: [],
  greenFilteredWords: [],
  allWords: [],
};

const fetchDataFromApi = createAsyncThunk("fetchWords", async () => {
  const res = await fetch(API_URl);
  const data = await res.text();
  const words = data.split("\n");
  return words;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromApi.fulfilled, (state, action) => {
        state.words = action.payload;
        state.fetchingData = false;
      })
      .addCase(fetchDataFromApi.pending, (state) => {
        state.fetchingData = true;
      });
  },
});
export const {
  setWords,
  setGrayFiltered,
  setGreenFiltered,
  setYellowFiltered,
  setAllFiltered,
} = wordsListSlice.actions;
export { fetchDataFromApi as fetchWordsData };
export default wordsListSlice.reducer;
