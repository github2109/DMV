const config = require("../utils/config");
const State = require("../models/state");
const jwt = require("jsonwebtoken");
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
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
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
    res.status(201).json(stateSaved);
  } catch (error) {
    next(error);
  }
};

exports.deleteStateById = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
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

exports.updateStateData = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
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
    return res.status(200).json(updatedState);
  } catch (error) {
    next(error);
  }
};
