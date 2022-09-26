import axios from "axios";
import { token } from "./token";
const loginAdmin = async (credentials) => {
  const response = await axios.post("/api/admin/login", credentials);
  return response.data;
};

const getListClientForMessenger = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get("api/client/messenger",config);
  return response.data;
};

const getClientByDeviceId = async (deviceId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get("api/client/" + deviceId,config);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { loginAdmin, getListClientForMessenger, getClientByDeviceId };
