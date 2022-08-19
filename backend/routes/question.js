const questionRouter = require("express").Router();

const {
  createQuestionAPI,
  getAllQuestionsForExamAPI,
  getAllQuestionsForModuleAPI,
  deleteQuestionByIdAPI,
} = require("../controllers/question");
questionRouter.post("/create-question", createQuestionAPI);
questionRouter.get("/get-questions-exam", getAllQuestionsForExamAPI);
questionRouter.delete("/delete-question/:id", deleteQuestionByIdAPI);
questionRouter.get(
  "/get-questions-module/:moduleId?",
  getAllQuestionsForModuleAPI
);

module.exports = questionRouter;