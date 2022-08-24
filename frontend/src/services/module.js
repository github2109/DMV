import axios from "axios";
const bareUrl = "/api/modules";

const getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  try {
    const response = await axios.get(
      `${bareUrl}/state/${stateId}/license/${licenseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getModuleByStateIdAndLicenseId };
