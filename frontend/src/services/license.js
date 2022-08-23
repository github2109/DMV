import axios from "axios";
const bareUrl = "/api/license";
const getAll = async () => {
    const response = await axios.get(`${bareUrl}/get-all-licenses`);
    return response.data;
}

export default {getAll}