import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/messages";

const sendMessageFromAdmin = async (message, deviceId) => {
  const response = await axios.post(`${bareUrl}/admin/${deviceId}`, message, {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  });
  return response.data;
};

const sendMessageFromClient = async (message, deviceId) => {
  const response = await axios.post(`${bareUrl}/client/${deviceId}`, message, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return response.data;
};

const getMessageByDeviceId = async (deviceId, page) => {
  const response = await axios.get(`${bareUrl}/${deviceId}`);
  return response.data;
};
const fechMoreMessages = async (deviceId, page) => {
  const response = await axios.get(`${bareUrl}/${deviceId}?page=${page}`);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sendMessageFromAdmin,
  sendMessageFromClient,
  getMessageByDeviceId,
  fechMoreMessages,
};
