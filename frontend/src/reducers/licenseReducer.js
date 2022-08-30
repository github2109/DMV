import { createSlice } from "@reduxjs/toolkit";
import licenseService from "../services/license";

const licenseSlice = createSlice({
  name: "license",
  initialState: [],
  reducers: {
    setLicense(state, action) {
      return action.payload;
    },
    appendLicense(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeLicense = () => {
  return async (dispatch) => {
    const licenses = await licenseService.getAll();
    dispatch(licenseSlice.actions.setLicense(licenses));
  };
};

export const createLicense = (license) => {
  return async (dispatch) => {
    const licenseSaved = await licenseService.createLicense(license);
    dispatch(licenseSlice.actions.appendLicense(licenseSaved));
  };
};

export default licenseSlice.reducer;
