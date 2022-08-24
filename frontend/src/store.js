import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducers/stateReducer";
import licenseReducer from "./reducers/licenseReducer";
import moduleReducer from "./reducers/moduleReducer";
const store = configureStore({
  reducer: {
    states: stateReducer,
    licenses: licenseReducer,
    modules: moduleReducer,
  },
});

export default store;
