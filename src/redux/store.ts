import { configureStore } from "@reduxjs/toolkit";
import InputsReducer from "./inputs/inputs";
import WordsReducer from "./words/words";
const store = configureStore({
  reducer: { inputs: InputsReducer, words: WordsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
