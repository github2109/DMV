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


moduleRouter.get("/:moduleId", getDescriptionByModuleIdAPI);
moduleRouter.get("/licenses/:licenseId", getModuleByLicenseIdAPI);
moduleRouter.get("/states/:stateId/licenses/:licenseId", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/", createModuleAPI);
moduleRouter.post("/:moduleId/states/:stateId", addModuleToStateAPI);
moduleRouter.delete("/:moduleId", deleteModuleAPI);
moduleRouter.delete("/:moduleId/states/:stateId", removeModuleOfStateAPI);
moduleRouter.put("/:moduleId", updateModuleAPI);
moduleRouter.put("/",updatePositionModuleAPI);

module.exports = moduleRouter;
