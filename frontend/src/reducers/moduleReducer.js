import { createSlice } from "@reduxjs/toolkit";
import moduleService from "../services/module";
const moduleSlice = createSlice({
  name: "module",
  initialState: [],
  reducers: {
    setModules: (state, action) => {
      return action.payload;
    },
    updateModule: (state, action) => {
      return state.map((module) =>
        module._id !== action.payload._id ? module : action.payload
      );
    },
    createModule: (state, action) => {
      state.push(action.payload);
    },
    deleteModule: (state, action) => {
      return state.filter((module) => module._id !== action.payload);
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

export const setModuleByLicenseId = (licenseId) => {
  return async (dispatch) => {
    const modules = await moduleService.getModuleByLicenseId(licenseId);
    dispatch(moduleSlice.actions.setModules(modules));
  };
};

export const getModuleByLicenseId = (licenseId) => {
  return async (dispatch) => {
    const modules = await moduleService.getModuleByLicenseId(licenseId);
    return modules;
  };
};

export const setModules = (modules) => {
  return (dispatch) => {
    dispatch(moduleSlice.actions.setModules(modules));
  };
};

export const savePositionModule = (modules) => {
  return async (dispatch) => {
    const listModuleId = modules.map((module) => module._id);
    await moduleService.updatePositionModule(listModuleId);
  };
};

export const getDetailModuleByModuleId = (moduleId) => {
  return async (dispatch) => {
    const module = await moduleService.getModuleByModuleId(moduleId);
    return module;
  };
};

export const updateModule = (oldModule, newModule) => {
  return async (dispatch) => {
    const module = await moduleService.updateModule(oldModule, newModule);
    dispatch(moduleSlice.actions.updateModule(module));
  };
};

export const createModule = (newModule) => {
  return async (dispatch) => {
    const module = await moduleService.createModule(newModule);
    dispatch(
      moduleSlice.actions.createModule({
        _id: module._id,
        name: module.name,
        position: module.position,
      })
    );
    return module;
  };
};

export const deleteModule = (moduleId) => {
  return async (dispatch) => {
    await moduleService.deleteModule(moduleId);
    dispatch(moduleSlice.actions.deleteModule(moduleId));
  };
};

export const deleteModuleFromState = (moduleId, stateId) => {
  return async (dispatch) => {
    await moduleService.deleteModuleFromState(moduleId, stateId);
    dispatch(moduleSlice.actions.deleteModule(moduleId));
  };
};

export const addModulesToState = (moduleId, stateId) => {
  return async (dispatch) => {
    const modules = await moduleService.addModulesToState(moduleId, stateId);
    modules.map((module) =>
      dispatch(
        moduleSlice.actions.createModule({
          _id: module._id,
          name: module.name,
          position: module.position,
          numberOfQuestion: module.questions.length,
        })
      )
    );
  };
};
export default moduleSlice.reducer;
