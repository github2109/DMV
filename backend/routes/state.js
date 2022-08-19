const stateRouter = require("express").Router();
const {
  getAllStates,
  createState,
  updateStateData,
  deleteStateById,
} = require("../controllers/state");

stateRouter.get("/get-all-states", getAllStates);
stateRouter.post("/create-state", createState);
stateRouter.delete("/delete-state/:id", deleteStateById);
stateRouter.put("/update-state/:id", updateStateData);
module.exports = stateRouter;
