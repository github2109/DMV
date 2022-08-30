import axios from "axios";
const bareUrl = "/api/states";

const getAll = async () => {
  const response = await axios.get(bareUrl);
  return response.data;
};
const createNewState = async (data) => {
  const response = await axios.post(bareUrl, { name: data });
  console.log("check state", response);
  return response.data;
};
const updateState = async (id, data) => {
  const response = await axios.put(`${bareUrl}/${id}`, { name: data });
  return response.data;
};
const deleteState = async (id) => {
  const response = await axios.delete(`${bareUrl}/${id}`);
  return response.data;
};
export default { getAll, createNewState, updateState, deleteState };
