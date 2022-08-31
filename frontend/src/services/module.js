import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/modules";

const getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  try {
    const response = await axios.get(
      `${bareUrl}?stateId=${stateId}&licenseId=${licenseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getModuleByModuleId = async (moduleId) => {
  try {
    const response = await axios.get(`${bareUrl}/${moduleId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getModuleByLicenseId = async (licenseId) => {
  try {
    const response = await axios.get(`${bareUrl}/licenses/${licenseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updatePositionModule = async (listModuleId) => {
  try {
    const config = {
      headers: { 
        Authorization: token 
      },
    };
    await axios.put(bareUrl, listModuleId,config);
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getModuleByStateIdAndLicenseId,
  getModuleByModuleId,
  getModuleByLicenseId,
  updatePositionModule,
};
