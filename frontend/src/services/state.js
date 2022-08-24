import axios from "axios";
const bareUrl = "/api/states";

const getAll = async () => {
    const response = await axios.get(bareUrl);
    return response.data;
}

export default {getAll}