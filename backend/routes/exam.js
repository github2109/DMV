const examRouter = require("express").Router();
const {
  createExamAPI,
  updateExamAPI,
  deleteExamByIdAPI,
  getListQuestionForExam,
} = require("../controllers/exam");

examRouter.post("/states/:stateId/licenses/:licenseId", createExamAPI);
examRouter.put("/:id", updateExamAPI);
examRouter.delete("/:id", deleteExamByIdAPI);
examRouter.get("/states/:stateId/licenses/:licenseId", getListQuestionForExam);

module.exports = examRouter;
