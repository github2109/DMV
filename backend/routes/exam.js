const examRouter = require("express").Router();
const {
  createExamAPI,
  updateExamAPI,
  deleteExamByIdAPI,
} = require("../controllers/exam");

examRouter.post("/create-exam/:stateId?/:examId?", createExamAPI);
examRouter.put("/edit-exam/:id", updateExamAPI);
examRouter.delete("/delete-exam/:id", deleteExamByIdAPI);

module.exports = examRouter;
