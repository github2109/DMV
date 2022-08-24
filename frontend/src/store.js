import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducers/stateReducer";
import licenseReducer from "./reducers/licenseReducer";
import moduleReducer from "./reducers/moduleReducer";
import filterReducer from "./reducers/filterReducer";
const store = configureStore({
  reducer: {
    states: stateReducer,
    licenses: licenseReducer,
    modules: moduleReducer,
    filter: filterReducer,
  },
});

export default store;
