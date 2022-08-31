import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/states";

const getAll = async () => {
  const response = await axios.get(bareUrl);
  return response.data;
};
const createNewState = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(bareUrl, { name: data }, config);
  console.log("check state", response);
  return response.data;
};
const updateState = async (id, data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${bareUrl}/${id}`, { name: data }, config);
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
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNewState, updateState, deleteState };
