import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/messages";

const sendMessageFromAdmin = async (message,deviceId) => {
  if (message.images && message.images.length > 0) {
    const config = {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    message.images.forEach(image=>formData.append("file", image));
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    message.images = [];
    urlRes.data.forEach((img) => message.images.push(img.url));
  }
  const response = await axios.post(`${bareUrl}/admin/${deviceId}`, message, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const sendMessageFromClient = async (message,deviceId) => {
  if (message.images && message.images.length > 0) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("file", module.imageDescription);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    urlRes.data((img) => module.images.push(img.url));
  }
  const response = await axios.post(`${bareUrl}/client/${deviceId}`, message);
  return response.data;
};

const getMessageByDeviceId = async (deviceId) => {
  const response = await axios.get(`${bareUrl}/${deviceId}`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sendMessageFromAdmin,
  sendMessageFromClient,
  getMessageByDeviceId,
};
