import axios from "axios";
import { token } from "./token";

const bareUrl = "/api/exams";
const getAll = async () => {
  const response = await axios.get(bareUrl);
  return response.data;
};
const getExamByStateIdAndLicenseId = async (stateId, licenseId) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.get(
    `${bareUrl}?stateId=${stateId}&licenseId=${licenseId}`,
    config
  );
  return response.data;
};
const getExamByExamId = async (examId, stateId, licenseId) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.get(
    `${bareUrl}/${examId}?stateId=${stateId}&licenseId=${licenseId}`,
    config
  );
  return response.data;
};
const createExam = async (exam, stateId, licenseId) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    `${bareUrl}/?stateId=${stateId}&licenseId=${licenseId}`,
    exam,
    config
  );
  return response.data;
};
const updateExam = async (oldExam, newExam) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.put(
    `${bareUrl}/${oldExam._id}`,
    newExam,
    config
  );
  return response.data;
};
const deleteExam = async (examId) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.delete(`${bareUrl}/${examId}`, config);
  return response.data;
};
export default {
  getAll,
  getExamByStateIdAndLicenseId,
  getExamByExamId,
  createExam,
  updateExam,
  deleteExam,
};
