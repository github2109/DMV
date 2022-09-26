import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/modules";

const getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  const response = await axios.get(
    `${bareUrl}?stateId=${stateId}&licenseId=${licenseId}`
  );
  return response.data;
};

const getModuleByModuleId = async (moduleId) => {
  const response = await axios.get(`${bareUrl}/${moduleId}`);
  return response.data;
};

const getModuleByLicenseId = async (licenseId) => {
  const response = await axios.get(`${bareUrl}/licenses/${licenseId}`);
  return response.data;
};

const updatePositionModule = async (listModuleId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.put(bareUrl, listModuleId, config);
};

const createModule = async (module) => {
  if (module.imageDescription && typeof module.imageDescription !== "string") {
    const config = {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    formData.append("file", module.imageDescription);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    module.imageDescription = urlRes.data[0].url;
  }
  const response = await axios.post(bareUrl, module, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateModule = async (oldModule, newModule) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  if (typeof newModule.imageDescription !== "string") {
    await axios.post(
      "/api/uploads/removeImages",
      { path: oldModule.imageDescription },
      config
    );
    let formData = new FormData();
    formData.append("file", newModule.imageDescription);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    newModule.imageDescription = urlRes.data[0].url;
  }
  const response = await axios.put(`${bareUrl}/${oldModule._id}`, newModule, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const deleteModule = async (moduleId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const module = await getModuleByModuleId(moduleId);
  await axios.post(
    "/api/uploads/removeImages",
    { path: module.imageDescription },
    config
  );
  const response = await axios.delete(`${bareUrl}/${moduleId}`, config);
  return response.data;
};
const addModulesToState = async (modulesId, stateId) => {
  const responses = [];
  for (let i = 0; i < modulesId.length; i++) {
    const response = await addOneModuleToState(modulesId[i], stateId);
    responses.push(response.moduleSaved);
  }
  return responses;
};
const addOneModuleToState = async (moduleId, stateId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(
    `${bareUrl}/${moduleId}/states/${stateId}`,
    null,
    config
  );
  return response.data;
};
const deleteModuleFromState = async (moduleId, stateId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(
    `${bareUrl}/${moduleId}/states/${stateId}`,
    config
  );
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getModuleByStateIdAndLicenseId,
  getModuleByModuleId,
  getModuleByLicenseId,
  updatePositionModule,
  updateModule,
  createModule,
  deleteModule,
  addOneModuleToState,
  addModulesToState,
  deleteModuleFromState,
};
