const moduleRouter = require("express").Router();
const {
  getModuleByStateIdAndLicenseIdAPI,
  createModuleAPI,
  addModuleToStateAPI,
  getDescriptionByModuleIdAPI,
  deleteModuleAPI,
  removeModuleOfStateAPI,
  updateModuleAPI,
  getModuleByLicenseIdAPI,
  updatePositionModuleAPI
} = require("../controllers/module");


moduleRouter.get("/description/:moduleId", getDescriptionByModuleIdAPI);
moduleRouter.get("/license/:licenseId", getModuleByLicenseIdAPI);
moduleRouter.get("/:stateId?/:licenseId?", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/", createModuleAPI);
moduleRouter.post("/add-module-to-state/:stateId?/:moduleId?", addModuleToStateAPI);
moduleRouter.delete("/:moduleId", deleteModuleAPI);
moduleRouter.delete("/remove-module-of-state/:stateId?/:moduleId?", removeModuleOfStateAPI);
moduleRouter.put("/:moduleId", updateModuleAPI);
moduleRouter.put("/",updatePositionModuleAPI);

module.exports = moduleRouter;
