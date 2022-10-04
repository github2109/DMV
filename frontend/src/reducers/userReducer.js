import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    updateUsers: (state, action) => {
      return state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    appendUser: (state, action) => {
      return [action.payload].concat(state);
    },
  },
});

export const setListClientForMessenger = () => {
  return async (dispatch) => {
    const users = await userService.getListClientForMessenger();
    dispatch(userSlice.actions.setUsers(users));
  };
};

export const executeListMessUserAfterReceiveMess = (data, users) => {
  return async (dispatch) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].deviceId === data.deviceId) {
        const user = {
          ...users[i],
          recentMessage: data.message,
    
        };
        dispatch(userSlice.actions.updateUsers(user));
        return;
      }
    }
    const user = await userService.getClientByDeviceId(data.deviceId);
    dispatch(userSlice.actions.appendUser(user));
  };
};


export default userSlice.reducer;
