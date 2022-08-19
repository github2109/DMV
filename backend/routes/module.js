const moduleRouter = require("express").Router();
const {
  getModuleByStateIdAndLicenseIdAPI,
  createModuleAPI,
  addModuleToStateAPI,
  getDescriptionByModuleIdAPI
} = require("../controllers/module");

moduleRouter.get("/:stateId?/:licenseId?", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/", createModuleAPI);
moduleRouter.post("/:stateId?", addModuleToStateAPI);
moduleRouter.get("/:moduleId",getDescriptionByModuleIdAPI);

module.exports = moduleRouter;
