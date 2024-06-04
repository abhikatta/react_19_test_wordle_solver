import { configureStore } from "@reduxjs/toolkit";
import InputsReducer from "../redux/inputs/inputs";
const store = configureStore({
  reducer: { inputs: InputsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
