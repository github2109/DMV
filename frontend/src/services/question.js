import axios from "axios";
import { token } from "./token";
const bareUrl = "/api/questions";

const getQuestionByModuleId = async (moduleId) => {
  const response = await axios.get(`${bareUrl}/modules/${moduleId}`);
  return response.data;
};

const createQuestion = async (question) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  let formData = new FormData();
  formData.append("file", question.image);
  const urlRes = await axios.post(
    "/api/uploads/uploadImages",
    formData,
    config
  );
  question.image = urlRes.data[0].url;
  const response = await axios.post(bareUrl, question, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateQuestion = async (oldQuestion, newQuestion) => {
  const config = {
    headers: {
      Authorization: token,
      "content-type": "multipart/form-data",
    },
  };
  if (typeof newQuestion.image !== "string") {
    await axios.post(
      "/api/uploads/removeImages",
      { path: oldQuestion.image },
      config
    );
    let formData = new FormData();
    formData.append("file", newQuestion.image);
    const urlRes = await axios.post(
      "/api/uploads/uploadImages",
      formData,
      config
    );
    newQuestion.image = urlRes.data[0].url;
  }
  const response = await axios.put(
    `${bareUrl}/${oldQuestion._id}`,
    newQuestion,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

const deleteQuestion = async (question) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.post(
    "/api/uploads/removeImages",
    { path: question.image },
    config
  );
  const response = await axios.delete(`${bareUrl}/${question._id}`, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getQuestionByModuleId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
