const licenseRouter = require("express").Router();
const {
  createLicense,
  getListLicenses,
  deleLicenseById,
  updateLicenseData,
} = require("../controllers/license");

licenseRouter.post("/", createLicense);
licenseRouter.get("/", getListLicenses);
licenseRouter.delete("/:id", deleLicenseById);
licenseRouter.put("/:id", updateLicenseData);

module.exports = licenseRouter;
