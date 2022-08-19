const licenseRouter = require("express").Router();
const {
  createLicense,
  getListLicenses,
  deleLicenseById,
  updateLicenseData,
} = require("../controllers/license");

licenseRouter.post("/create-license", createLicense);
licenseRouter.get("/get-all-licenses", getListLicenses);
licenseRouter.delete("/delete-license/:id", deleLicenseById);
licenseRouter.put("/edit-license/:id", updateLicenseData);

module.exports = licenseRouter;
