import axios from "axios";

const loginAdmin = async (credentials) => {
  const response = await axios.post("/api/admin/login", credentials);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { loginAdmin };
