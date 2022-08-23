import { createSlice } from "@reduxjs/toolkit";
import licenseService from "../services/license";

const licenseSlice = createSlice({
  name: "license",
  initialState: [],
  reducers: {
    setLicense(state, action) {
      return action.payload;
    },
  },
});

export const { setLicense } = licenseSlice.actions;

export const initializeLicense = () => {
  return async (dispatch) => {
    const licenses = await licenseService.getAll();
    dispatch(setLicense(licenses));
  };
};

export default licenseSlice.reducer;

