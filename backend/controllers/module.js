const Module = require("../models/module");
const State = require("../models/state");
exports.updateModuleAfterRemoveState = async (stateId) => {
  try {
    const modules = await Module.updateMany(
      { states: stateId },
      {
        $pull: {
          states: stateId,
        },
      }
    );
    return modules;
  } catch (error) {
    console.log(error);
  }
};
exports.updateModuleAfterRemoveLicense = async (licenseId) => {
  try {
    const modules = await Module.updateMany(
      { license: licenseId },
      {
        $set: {
          license: null,
        },
      }
    );
    return modules;
  } catch (error) {
    console.log(error);
  }
};
exports.getModuleByStateIdAndLicenseId = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.body;
    const modules = await Module.find({ license: licenseId, states: stateId });
    res.json(modules);
  } catch (error) {
    next(error);
  }
};

exports.createModule = async (req, res, next) => {
  try {
    const module = req.body;
    const check = await Module.findOne({ name: module.name });
    if (check) {
      return res.status(500).json({ message: "This name already exists" });
    }
    const moduleSaved = await new Module(module).save();
    return res.status(200).json({ moduleSaved });
  } catch (error) {
    next(error);
  }
};

exports.addModuleToState = async (req, res, next) => {
  try {
    const { moduleId, stateId } = req.body;
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Can't not find module" });
    }
    if (!(await State.findById(stateId))) {
      return res.status(404).json({ message: "Can't find state" });
    }
    if (module.states.includes(stateId)) {
      return res
        .status(500)
        .json({ message: "Module already exists in state" });
    }
    module.states.push(stateId);
    const moduleSaved = await module.save();
    return res.status(200).json({ moduleSaved });
  } catch (error) {
    next(error);
  }
};
