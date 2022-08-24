import axios from "axios";
const bareUrl = "/api/license";
const getAll = async () => {
  try {
    const response = await axios.get(`${bareUrl}/get-all-licenses`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll };
