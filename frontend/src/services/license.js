import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/licenses";
const getAll = async () => {
  try {
    const response = await axios.get(bareUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const createLicense = async (license) => {
  try {
    const config = {
      headers: { 
        Authorization: token ,
        'content-type': "multipart/form-data"
      },
    };
    let formData = new FormData();
    formData.append("file", license.image);
    const urlRes = await axios.post("/api/uploads/uploadImages", formData, config);
    license.image = urlRes.data[0].url;
    const response = await axios.post(bareUrl, license,config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default { getAll, createLicense };
