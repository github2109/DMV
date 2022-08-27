const moduleRouter = require("express").Router();
const {
  getModuleByStateIdAndLicenseIdAPI,
  createModuleAPI,
  addModuleToStateAPI,
  getDetailModuleByModuleIdAPI,
  deleteModuleAPI,
  removeModuleOfStateAPI,
  updateModuleAPI,
  getModuleByLicenseIdAPI,
  updatePositionModuleAPI
} = require("../controllers/module");


moduleRouter.get("/:moduleId", getDetailModuleByModuleIdAPI);
moduleRouter.get("/licenses/:licenseId", getModuleByLicenseIdAPI);
moduleRouter.get("/:stateId?/:licenseId?", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/", createModuleAPI);
moduleRouter.post("/:moduleId/states/:stateId", addModuleToStateAPI);
moduleRouter.delete("/:moduleId", deleteModuleAPI);
moduleRouter.delete("/:moduleId/states/:stateId", removeModuleOfStateAPI);
moduleRouter.put("/:moduleId", updateModuleAPI);
moduleRouter.put("/",updatePositionModuleAPI);

module.exports = moduleRouter;
