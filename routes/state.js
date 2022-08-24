const stateRouter = require("express").Router();
const {
  getAllStates,
  createState,
  updateStateData,
  deleteStateById,
} = require("../controllers/state");

stateRouter.get("/", getAllStates);
stateRouter.post("/", createState);
stateRouter.delete("/:id", deleteStateById);
stateRouter.put("/:id", updateStateData);
module.exports = stateRouter;
