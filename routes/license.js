const licenseRouter = require("express").Router();
const {
  createLicense,
  getListLicenses,
  deleteLicenseById,
  updateLicenseData,
} = require("../controllers/license");
const middlwares = require("../utils/middleware");

licenseRouter.post("/",middlwares.authAdmin, createLicense);
licenseRouter.get("/", getListLicenses);
licenseRouter.delete("/:id",middlwares.authAdmin, deleteLicenseById);
licenseRouter.put("/:id",middlwares.authAdmin, updateLicenseData);

module.exports = licenseRouter;
