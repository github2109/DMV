import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducers/stateReducer";
import licenseReducer from "./reducers/licenseReducer";
import moduleReducer from "./reducers/moduleReducer";
import filterReducer from "./reducers/filterReducer";
import questionReducer from "./reducers/questionReducer";
import responseUIReducer from "./reducers/responseUIReducer";
import examReducer from "./reducers/examReducer";
const store = configureStore({
  reducer: {
    states: stateReducer,
    licenses: licenseReducer,
    modules: moduleReducer,
    filter: filterReducer,
    questions: questionReducer,
    responseUI: responseUIReducer,
    exams: examReducer,
  },
});

export default store;
