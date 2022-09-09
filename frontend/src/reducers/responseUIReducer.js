import { createSlice } from "@reduxjs/toolkit";

const responseUISlice = createSlice({
  name: "responseUI",
  initialState: {
    loading: false,
    notification: null,
    isErrorNotification: false,
  },
  reducers: {
    onLoading(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    offLoading(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    setSuccessNotification(state, action) {
      return {
        ...state,
        notification: action.payload,
        isErrorNotification: false,
      };
    },
    setErrorNotification(state, action) {
      return {
        ...state,
        notification: action.payload,
        isErrorNotification: true,
      };
    },
    removeNotification(state, action) {
      return {
        ...state,
        notification: null,
      };
    },
  },
});

export const onLoading = () => {
  return (dispatch) => {
    dispatch(responseUISlice.actions.onLoading());
  };
};

export const offLoading = () => {
  return (dispatch) => {
    dispatch(responseUISlice.actions.offLoading());
  };
};

export const setSuccessNotification = (mess) => {
  return (dispatch) => {
    dispatch(responseUISlice.actions.setSuccessNotification(mess));
    setTimeout(() => {
      dispatch(responseUISlice.actions.removeNotification());
    }, 3000);
  };
};

export const setErrorNotification = (mess) => {
  return (dispatch) => {
    dispatch(responseUISlice.actions.setErrorNotification(mess));
    setTimeout(() => {
      dispatch(responseUISlice.actions.removeNotification());
    }, 3000);
  };
};
export default responseUISlice.reducer;
