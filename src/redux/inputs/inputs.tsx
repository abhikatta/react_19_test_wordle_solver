import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  C_L1: string;
  C_L2: string;
  C_L3: string;
  C_L4: string;
  C_L5: string;

  Y_L1: string;
  Y_L2: string;
  Y_L3: string;
  Y_L4: string;
  Y_L5: string;

  G_L1: string;
  G_L2: string;
  G_L3: string;
  G_L4: string;
  G_L5: string;
}

const initialState: InitialState = {
  C_L1: "",
  C_L2: "",
  C_L3: "",
  C_L4: "",
  C_L5: "",
  Y_L1: "",
  Y_L2: "",
  Y_L3: "",
  Y_L4: "",
  Y_L5: "",
  G_L1: "",
  G_L2: "",
  G_L3: "",
  G_L4: "",
  G_L5: "",
};

interface PayloadType {
  name: string;
  value: string;
}
const inputsSlice = createSlice({
  name: "inputs",
  initialState: initialState,
  reducers: {
    addInput: (state, payload: PayloadAction<PayloadType>) => {
      console.log(state, payload);
    },
  },
});

export const { addInput } = inputsSlice.actions;
export default inputsSlice.reducer;
