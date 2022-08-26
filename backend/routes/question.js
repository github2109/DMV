const questionRouter = require("express").Router();

const {
  createQuestionAPI,
  getAllQuestionsForExamAPI,
  getAllQuestionsForModuleAPI,
  deleteQuestionByIdAPI,
  updateQuestionByIdAPI,
} = require("../controllers/question");
questionRouter.post("/modules/:moduleId?", createQuestionAPI);
questionRouter.get("/", getAllQuestionsForExamAPI);
questionRouter.delete(
  "/questions/:questionId/modules/:moduleId",
  deleteQuestionByIdAPI
);
questionRouter.get("/modules/:moduleId?", getAllQuestionsForModuleAPI);
questionRouter.put("/:id", updateQuestionByIdAPI);

module.exports = questionRouter;
