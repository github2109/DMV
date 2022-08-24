import { createSlice } from "@reduxjs/toolkit";
import moduleService from "../services/module";
const moduleSlice = createSlice({
  name: "module",
  initialState: [],
  reducers: {
    setModules: (state, action) => {
      return action.payload;
    },
  },
});

export const { setModules } = moduleSlice.actions;

export const setModuleByStateIdAndLicenseId = (stateId, licenseId) => {
  return async (dispatch) => {
    const modules = await moduleService.getModuleByStateIdAndLicenseId(
      stateId,
      licenseId
    );
    dispatch(setModules(modules));
  };
};

export const setModuleByModuleId = (moduleId) => {
  return async (dispatch) => {
    const module = await moduleService.getModuleByModuleId(moduleId);
    dispatch(setModules(module));
  };
};

export default moduleSlice.reducer;
