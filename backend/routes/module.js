const moduleRouter = require("express").Router();
const {
  getModuleByStateIdAndLicenseIdAPI,
  createModuleAPI,
  addModuleToStateAPI,
  getDescriptionByModuleIdAPI,
  deleteModuleAPI,
  removeModuleOfStateAPI
} = require("../controllers/module");


moduleRouter.get("/description/:moduleId", getDescriptionByModuleIdAPI);
moduleRouter.get("/:stateId?/:licenseId?", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/", createModuleAPI);
moduleRouter.post("/add-module-to-state/:stateId?/:moduleId?", addModuleToStateAPI);
moduleRouter.delete("/:moduleId", deleteModuleAPI);
moduleRouter.delete("/remove-module-of-state/:stateId?/:moduleId?", removeModuleOfStateAPI);

module.exports = moduleRouter;
