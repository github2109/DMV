import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/states";

const getAll = async () => {
  const response = await axios.get(bareUrl);
  return response.data;
};
const createState = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(bareUrl, { name: data }, config);
  return response.data;
};
const updateState = async (oldState, newState) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${bareUrl}/${oldState._id}`,
    { name: newState },
    config
  );
  return response.data;
};
const deleteState = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${bareUrl}/${id}`, config);
  return response.data;
};
export default { getAll, createState, updateState, deleteState };
