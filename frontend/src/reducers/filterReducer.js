import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateId: null,
  licenseId: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setStateId(state, action) {
      return {
        ...state,
        stateId: action.payload,
      };
    },
    setLicenseId(state, action) {
      return {
        ...state,
        licenseId: action.payload,
      };
    },
  },
});

export const setStateId = (stateId) => {
  return (dispatch) => {
    dispatch(filterSlice.actions.setStateId(stateId));
  };
};

export const setLicenseId = (licenseId) => {
  return (dispatch) => {
    dispatch(filterSlice.actions.setLicenseId(licenseId));
  };
};

export default filterSlice.reducer;