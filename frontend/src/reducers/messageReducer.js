import { createSlice } from "@reduxjs/toolkit";
import messageService from "../services/message";
import { socket } from "../services/socket";
import { executeListMessUserAfterReceiveMess } from "./userReducer";
const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      return action.payload;
    },
    appendMessage: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const setMessagesByDeviceId = (deviceId) => {
  return async (dispatch) => {
    const messages = await messageService.getMessageByDeviceId(deviceId);
    dispatch(messageSlice.actions.setMessages(messages));
  };
};

export const sendMessageFromAdmin = (message, deviceId, users) => {
  return async (dispatch) => {
    const messageSaved = await messageService.sendMessageFromAdmin(
      message,
      deviceId
    );
    socket.emit("send_message", { message: messageSaved, deviceId });
    dispatch(messageSlice.actions.appendMessage(messageSaved));
    dispatch(
      executeListMessUserAfterReceiveMess(
        { message: messageSaved, deviceId },
        users
      )
    );
  };
};

export const executedConvertationReceiveMessage = (data, users, userSelect) => {
  return async (dispatch) => {
    if (userSelect && data.deviceId === userSelect.deviceId)
      dispatch(messageSlice.actions.appendMessage(data.message));
    dispatch(executeListMessUserAfterReceiveMess(data, users));
  };
};

export default messageSlice.reducer;
