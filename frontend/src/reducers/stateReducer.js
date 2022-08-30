import { createSlice } from "@reduxjs/toolkit";
import stateService from "../services/state";

const stateSlice = createSlice({
  name: "state",
  initialState: [],
  reducers: {
    setStates(state, action) {
      return action.payload;
    },
  },
});

export const { setStates } = stateSlice.actions;

export const initializeState = () => {
  return async (dispatch) => {
    const states = await stateService.getAll();
    dispatch(setStates(states));
  };
};

export default stateSlice.reducer;
