import axios from "axios";
const bareUrl = "/api/state";

const getAll = async () => {
    const response = await axios.get(`${bareUrl}/get-all-states`);
    return response.data;
}

export default {getAll}