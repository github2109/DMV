const examRouter = require("express").Router();
const {
  createExamAPI,
  updateExamAPI,
  deleteExamByIdAPI,
  getExamByExamIdAPI,
  getListExamByStateAndLicenseAPI,
} = require("../controllers/exam");
const middlwares = require("../utils/middleware");

examRouter.post("/:stateId?/:licenseId?",middlwares.authAdmin, createExamAPI);
examRouter.put("/:id",middlwares.authAdmin, updateExamAPI);
examRouter.delete("/:id",middlwares.authAdmin, deleteExamByIdAPI);
examRouter.get("/:examId",getExamByExamIdAPI);
examRouter.get("/:stateId?/:licenseId?",getListExamByStateAndLicenseAPI);

module.exports = examRouter;
