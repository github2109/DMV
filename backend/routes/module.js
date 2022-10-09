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
const middlwares = require("../utils/middleware");

moduleRouter.get("/:moduleId", getDetailModuleByModuleIdAPI);
moduleRouter.get("/licenses/:licenseId/:page?", getModuleByLicenseIdAPI);
moduleRouter.get("/:stateId?/:licenseId?", getModuleByStateIdAndLicenseIdAPI);
moduleRouter.post("/",middlwares.authAdmin, createModuleAPI);
moduleRouter.post("/:moduleId/states/:stateId",middlwares.authAdmin, addModuleToStateAPI);
moduleRouter.delete("/:moduleId",middlwares.authAdmin, deleteModuleAPI);
moduleRouter.delete("/:moduleId/states/:stateId",middlwares.authAdmin, removeModuleOfStateAPI);
moduleRouter.put("/:moduleId",middlwares.authAdmin, updateModuleAPI);
moduleRouter.put("/",middlwares.authAdmin,updatePositionModuleAPI);

module.exports = moduleRouter;
