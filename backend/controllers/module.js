const Module = require("../models/module");
const State = require("../models/state");

exports.getModuleByModuleId = async (moduleId) => {
  return await Module.findById(moduleId).populate("questions");
};

exports.updateModuleAfterRemoveQuestion = async (moduleId, questionId) => {
  const module = await Module.findById(moduleId);
  module.questions = module.questions.filter(
    (question) => question !== questionId
  );
  return await module.save();
};

exports.updateModuleAfterCreateQuestion = async (moduleId, questionId) => {
  const module = await Module.findById(moduleId);
  module.questions.push(questionId);
  return await module.save();
};

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

const getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  return await Module.find({ license: licenseId, states: stateId });
};
exports.getModuleByStateIdAndLicenseId = getModuleByStateIdAndLicenseId;

exports.getModuleByStateIdAndLicenseIdAPI = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.query;
    const modules = await getModuleByStateIdAndLicenseId(stateId, licenseId);
    res.json(modules);
  } catch (error) {
    next(error);
  }
};

exports.getModuleByLicenseIdAPI = async (req, res, next) => {
  try {
    const { licenseId } = req.query;
    const modules = await Module.find({ license:licenseId });
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

exports.createModuleAPI = async (req, res, next) => {
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

exports.deleteModuleAPI = async (req, res, next) => {
  try {
    await Module.findByIdAndDelete(req.params.moduleId);
    res.status(200).json({ message: "Module deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addModuleToStateAPI = async (req, res, next) => {
  try {
    const { stateId, moduleId } = req.query;
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

exports.removeModuleOfStateAPI = async (req, res, next) => {
  try {
    const { stateId, moduleId } = req.query;
    const module = await Module.findOne({ _id: moduleId, states: stateId });
    if (!module) {
      return res.status(404).json({ message: "Can't find module" });
    }
    module.states = module.states.filter((state) => state !== stateId);
    await module.save();
    return res
      .status(200)
      .json({ message: "Module removed from state successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getDescriptionByModuleIdAPI = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const description = await Module.findById(moduleId).select({
      titleDescription: 1,
      contentDescription: 1,
      imageDescription: 1,
    });
    res.status(200).json(description);
  } catch (error) {
    next(error);
  }
};

exports.updateModuleAPI = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const moduleUpdated = await Module.findByIdAndUpdate(moduleId, req.body);
    res.status(200).json(moduleUpdated);
  } catch (error) {
    next(error);
  }
};