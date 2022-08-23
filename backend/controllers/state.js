const config = require("../utils/config");
const State = require("../models/state");
const { updateModuleAfterRemoveState } = require("../controllers/module");

exports.getAllStates = async (req, res, next) => {
  try {
    state = await State.find({});
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

exports.createState = async (req, res, next) => {
  try {
    const { name } = req.body;
    const check = await State.findOne({ name: name });
    if (check) {
      return res.status(500).json({
        message: "This name is already in use. Please use a different name",
      });
    }
    const state = await new State({
      name,
    });
    const stateSaved = await state.save();
    res
      .status(201)
      .json({ stateSaved, message: "State was created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteStateById = async (req, res, next) => {
  try {
    const stateId = req.params.id;
    const deletedState = await State.findByIdAndRemove({ _id: stateId });
    if (!deletedState) {
      return res.status(500).json({
        message: "The state was not found",
      });
    }
    const test = await updateModuleAfterRemoveState(stateId);
    res
      .status(200)
      .json({ deletedState, message: "State was deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateStateData = async (req, res, next) => {
  try {
    const data = req.body;
    const dataId = req.params.id;
    const updatedState = await State.findByIdAndUpdate(
      { _id: dataId },
      { name: data.name },
      { new: true }
    );
    if (!updatedState) {
      return res.status(500).json({
        message: "The state was not found",
      });
    }
    return res
      .status(200)
      .json({ updatedState, message: "State was updated successfully" });
  } catch (error) {
    next(error);
  }
};
