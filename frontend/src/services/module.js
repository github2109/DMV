import axios from "axios";
const bareUrl = "/api/modules";

const getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  try {
    const response = await axios.get(
      `${bareUrl}/states/${stateId}/licenses/${licenseId}`
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

export default { getModuleByStateIdAndLicenseId, getModuleByModuleId ,getModuleByLicenseId};
