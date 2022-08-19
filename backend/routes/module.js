const moduleRouter = require("express").Router();
const {
  getModuleByStateIdAndLicenseId,
  createModule,
  addModuleToState,
} = require("../controllers/module");

moduleRouter.get("/", getModuleByStateIdAndLicenseId);
moduleRouter.post("/", createModule);
moduleRouter.post("/addModuleToState", addModuleToState);

module.exports = moduleRouter;
