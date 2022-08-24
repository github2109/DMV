const examRouter = require("express").Router();
const {
  createExamAPI,
  updateExamAPI,
  deleteExamByIdAPI,
  getListQuestionForExam,
} = require("../controllers/exam");

examRouter.post("/state/:stateId/license/:licenseId", createExamAPI);
examRouter.put("/:id", updateExamAPI);
examRouter.delete("/:id", deleteExamByIdAPI);
examRouter.get("/state/:stateId/license/:licenseId", getListQuestionForExam);

module.exports = examRouter;
