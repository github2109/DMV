const questionRouter = require("express").Router();

const {
  createQuestionAPI,
  getQuestionsForExamAPI,
  getAllQuestionsForModuleAPI,
  deleteQuestionByIdAPI,
  updateQuestionByIdAPI,
} = require("../controllers/question");
const middlwares = require("../utils/middleware");

questionRouter.post("/",middlwares.authAdmin, createQuestionAPI);
questionRouter.get("/exams/:examId", getQuestionsForExamAPI);
questionRouter.delete("/:questionId",middlwares.authAdmin, deleteQuestionByIdAPI);
questionRouter.get("/modules/:moduleId", getAllQuestionsForModuleAPI);
questionRouter.put("/:id",middlwares.authAdmin, updateQuestionByIdAPI);

module.exports = questionRouter;
