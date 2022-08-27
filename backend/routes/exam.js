const examRouter = require("express").Router();
const {
  createExamAPI,
  updateExamAPI,
  deleteExamByIdAPI,
  getExamByExamIdAPI,
  getListExamByStateAndLicenseAPI,
} = require("../controllers/exam");

examRouter.post("/:stateId?/:licenseId?", createExamAPI);
examRouter.put("/:id", updateExamAPI);
examRouter.delete("/:id", deleteExamByIdAPI);
examRouter.get("/:examId",getExamByExamIdAPI);
examRouter.get("/:stateId?/:licenseId?", getListExamByStateAndLicenseAPI);

module.exports = examRouter;
