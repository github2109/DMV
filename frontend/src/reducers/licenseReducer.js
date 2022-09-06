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
    deleteLicense(state, action) {
      return state.filter((license) => license._id !== action.payload);
    },
    updateLicense(state, action) {
      return state.map((license) =>
        license._id !== action.payload._id ? license : action.payload
      );
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

export const deleteLicense =  (license) => {
  return async (dispatch) => {
    const licenseDeleted = await licenseService.deleteLicense(
      license._id,
      license.image
    );
    dispatch(licenseSlice.actions.deleteLicense(license._id));
  };
};

export const updateLicense =  (oldLicense, newLicense) => {
  return async (dispatch) => {
    const licenseSaved = await licenseService.updateLicense(
      oldLicense,
      newLicense
    );
    dispatch(licenseSlice.actions.updateLicense(licenseSaved));
  };
};

export default licenseSlice.reducer;
