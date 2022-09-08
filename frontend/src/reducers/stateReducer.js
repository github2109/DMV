import { createSlice } from "@reduxjs/toolkit";
import stateService from "../services/state";

const stateSlice = createSlice({
  name: "state",
  initialState: [],
  reducers: {
    setStates(state, action) {
      return action.payload;
    },
    appendState(state, action) {
      state.push(action.payload);
    },
    deleteState(state, action) {
      return state.filter((state) => state._id !== action.payload);
    },
    updateState(state, action) {
      return state.map((addState) =>
        addState._id !== action.payload._id ? addState : action.payload
      );
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
export const createState = (state) => {
  return async (dispatch) => {
    const stateSaved = await stateService.createState(state);
    dispatch(stateSlice.actions.appendState(stateSaved));
  };
};

export const deleteState = (state) => {
  return async (dispatch) => {
    const stateDeleted = await stateService.deleteState(state._id);
    dispatch(stateSlice.actions.deleteState(state._id));
  };
};

export const updateState = (oldState, newState) => {
  return async (dispatch) => {
    const stateSaved = await stateService.updateState(oldState, newState);
    dispatch(stateSlice.actions.updateState(stateSaved));
  };
};

export default stateSlice.reducer;
