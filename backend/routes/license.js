const licenseRouter = require("express").Router();
const {
  createLicenseAPI,
  getListLicensesAPI,
  deleteLicenseByIdAPI,
  updateLicenseDataAPI,
} = require("../controllers/license");
const middlwares = require("../utils/middleware");

licenseRouter.post("/", middlwares.authAdmin, createLicenseAPI);
licenseRouter.get("/", getListLicensesAPI);
licenseRouter.delete("/:id", middlwares.authAdmin, deleteLicenseByIdAPI);
licenseRouter.put("/:id", middlwares.authAdmin, updateLicenseDataAPI);

module.exports = licenseRouter;
