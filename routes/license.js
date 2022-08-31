const licenseRouter = require("express").Router();
const {
  createLicense,
  getListLicenses,
  deleteLicenseById,
  updateLicenseData,
} = require("../controllers/license");

licenseRouter.post("/", createLicense);
licenseRouter.get("/", getListLicenses);
licenseRouter.delete("/:id", deleteLicenseById);
licenseRouter.put("/:id", updateLicenseData);

module.exports = licenseRouter;
