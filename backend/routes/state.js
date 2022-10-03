const stateRouter = require("express").Router();
const {
  getAllStates,
  createState,
  updateStateData,
  deleteStateById,
} = require("../controllers/state");
const middlwares = require("../utils/middleware");

stateRouter.get("/", getAllStates);
stateRouter.post("/",middlwares.authAdmin, createState);
stateRouter.delete("/:id",middlwares.authAdmin, deleteStateById);
stateRouter.put("/:id",middlwares.authAdmin, updateStateData);
module.exports = stateRouter;
