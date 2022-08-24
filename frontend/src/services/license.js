import axios from "axios";
const bareUrl = "/api/licenses";
const getAll = async () => {
  try {
    const response = await axios.get(bareUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll };
