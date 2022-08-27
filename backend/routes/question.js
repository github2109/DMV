const questionRouter = require("express").Router();

const {
  createQuestionAPI,
  getQuestionsForExamAPI,
  getAllQuestionsForModuleAPI,
  deleteQuestionByIdAPI,
  updateQuestionByIdAPI,
} = require("../controllers/question");
questionRouter.post("/", createQuestionAPI);
questionRouter.get("/exams/:examId", getQuestionsForExamAPI);
questionRouter.delete("/:questionId", deleteQuestionByIdAPI);
questionRouter.get("/modules/:moduleId", getAllQuestionsForModuleAPI);
questionRouter.put("/:id", updateQuestionByIdAPI);

module.exports = questionRouter;
