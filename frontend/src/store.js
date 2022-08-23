import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./reducers/stateReducer";
import licenseReducer from "./reducers/licenseReducer";
const store = configureStore({
    reducer:{
        states:stateReducer,
        licenses:licenseReducer
    },
});

export default store;