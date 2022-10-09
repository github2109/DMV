const State = require("../models/state");
const { updateModuleAfterRemoveState } = require("../services/module");
const { validateState } = require("./validators");

exports.getAllStatesAPI = async (req, res, next) => {
  try {
    const {page} = req.query;
    const pageQuery = page ? page : 1;
    state = await State.find({}).skip((pageQuery-1)*10).limit(10);
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

exports.createStateAPI = async (req, res, next) => {
  try {
    const result = await validateState(req.body);
    const check = await State.findOne({ name: result.name });
    if (check) {
      return res.status(500).json({
        message: "This name is already in use. Please use a different name",
      });
    }
    const state = await new State({
      name: result.name,
    });
    const stateSaved = await state.save();
    res.status(201).json(stateSaved);
  } catch (error) {
    next(error);
  }
};

exports.deleteStateByIdAPI = async (req, res, next) => {
  try {
    const stateId = req.params.id;
    const deletedState = await State.findByIdAndRemove({ _id: stateId });
    if (!deletedState) {
      return res.status(500).json({
        message: "The state was not found",
      });
    }
    await updateModuleAfterRemoveState(stateId);
    res.status(200).json(deletedState);
  } catch (error) {
    next(error);
  }
};

exports.updateStateDataAPI = async (req, res, next) => {
  try {
    const result = await validateState(req.body);
    const dataId = req.params.id;
    const updatedState = await State.findByIdAndUpdate(
      { _id: dataId },
      { name: result.name },
      { new: true }
    );
    if (!updatedState) {
      return res.status(500).json({
        message: "The state was not found",
      });
    }
    return res.status(200).json(updatedState);
  } catch (error) {
    next(error);
  }
};
