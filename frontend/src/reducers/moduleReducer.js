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

export const setModuleByStateIdAndLicenseId = (stateId, licenseId) => {
  return async (dispatch) => {
    const modules = await moduleService.getModuleByStateIdAndLicenseId(
      stateId,
      licenseId
    );
    dispatch(moduleSlice.actions.setModules(modules));
  };
};

export const setModuleByModuleId = (moduleId) => {
  return async (dispatch) => {
    const module = await moduleService.getModuleByModuleId(moduleId);
    dispatch(moduleSlice.actions.setModules(module));
  };
};

export const setModuleByLicenseId = (licenseId) => {
  return async (dispatch) => {
    const modules = await moduleService.getModuleByLicenseId(licenseId);
    dispatch(moduleSlice.actions.setModules(modules));
  };
};

export const setModules = (modules) => {
  return (dispatch) => {
    dispatch(moduleSlice.actions.setModules(modules));
  };
};

export const savePositionModule = (modules) => {
  return async (dispatch) => {
    const listModuleId = modules.map(module => module._id);
    await moduleService.updatePositionModule(listModuleId);
  }
}

export default moduleSlice.reducer;
