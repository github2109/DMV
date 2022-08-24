const questionRouter = require("express").Router();

const {
  createQuestionAPI,
  getAllQuestionsForExamAPI,
  getAllQuestionsForModuleAPI,
  deleteQuestionByIdAPI,
  updateQuestionByIdAPI,
} = require("../controllers/question");
questionRouter.post("/module/:moduleId?", createQuestionAPI);
questionRouter.get("/", getAllQuestionsForExamAPI);
questionRouter.delete(
  "/question/:questionId/modules/:moduleId",
  deleteQuestionByIdAPI
);
questionRouter.get("/module/:moduleId?", getAllQuestionsForModuleAPI);
questionRouter.put("/:id", updateQuestionByIdAPI);

module.exports = questionRouter;
