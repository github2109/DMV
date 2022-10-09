const stateRouter = require("express").Router();
const {
  getAllStatesAPI,
  createStateAPI,
  updateStateDataAPI,
  deleteStateByIdAPI,
} = require("../controllers/state");
const middlwares = require("../utils/middleware");

stateRouter.get("/", getAllStatesAPI);
stateRouter.post("/", middlwares.authAdmin, createStateAPI);
stateRouter.delete("/:id", middlwares.authAdmin, deleteStateByIdAPI);
stateRouter.put("/:id", middlwares.authAdmin, updateStateDataAPI);
module.exports = stateRouter;
