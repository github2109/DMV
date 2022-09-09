import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/licenses";
const getAll = async () => {
  const response = await axios.get(bareUrl);
  return response.data;
};
const createLicense = async (license) => {
  if(license.image !== null && typeof license.image !== "string") {
    const config = {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("file", license.image);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    license.image = urlRes.data[0].url;
  }
  const response = await axios.post(bareUrl, license, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateLicense = async (oldLicense, newLicense) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  if (typeof newLicense.image !== "string") {
    await axios.post(
      "/api/uploads/removeImages",
      { path: oldLicense.image },
      config
    );
    let formData = new FormData();
    formData.append("file", newLicense.image);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    newLicense.image = urlRes.data[0].url;
  }
  const response = await axios.put(`${bareUrl}/${oldLicense._id}`, newLicense, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const deleteLicense = async (licenseId, urlImage) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.post("/api/uploads/removeImages", { path: urlImage }, config);
  const response = await axios.delete(`${bareUrl}/${licenseId}`, config);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createLicense, updateLicense, deleteLicense };
