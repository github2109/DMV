const Module = require("../models/module");
const Question = require("../models/question");
const State = require("../models/state");
const { validateModule } = require("./validators");

exports.getModuleByStateIdAndLicenseIdAPI = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.query;
    const modules = await Module.find({ license: licenseId, states: stateId })
      .select({ name: 1, position: 1 })
      .sort({ position: 1 });
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

exports.getModuleByLicenseIdAPI = async (req, res, next) => {
  try {
    const { licenseId } = req.params;
    const { page } = req.query;
    const pageQuery = page ? page : 1;
    const modules = await Module.find({ license: licenseId })
      .select({
        name: 1,
        position: 1,
      })
      .sort({ position: 1 })
      .skip((pageQuery - 1) * 10)
      .limit(10);
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

exports.createModuleAPI = async (req, res, next) => {
  try {
    const result = await validateModule(req.body);
    const check = await Module.findOne({ name: result.name });
    if (check) {
      return res.status(500).json({ message: "This name already exists" });
    }
    const moduleSaved = await new Module(result).save();
    res.status(201).json(moduleSaved);
  } catch (error) {
    next(error);
  }
};

exports.deleteModuleAPI = async (req, res, next) => {
  try {
    await Module.findByIdAndDelete(req.params.moduleId);
    await Question.deleteMany({ module: req.params.moduleId });
    res.status(200).json({ message: "Module deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addModuleToStateAPI = async (req, res, next) => {
  try {
    const { stateId, moduleId } = req.params;
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
    return res.status(200).json(moduleSaved);
  } catch (error) {
    next(error);
  }
};

exports.removeModuleOfStateAPI = async (req, res, next) => {
  try {
    const { stateId, moduleId } = req.params;
    const module = await Module.findById(moduleId);
    if (!module.states.includes(stateId)) {
      return res
        .status(404)
        .json({ message: "This state is not include this module" });
    }
    module.states = module.states.filter((state) => String(state) !== stateId);
    await module.save();
    return res
      .status(200)
      .json({ message: "Module removed from state successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getDetailModuleByModuleIdAPI = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const description = await Module.findById(moduleId).select({
      license: 1,
      titleDescription: 1,
      contentDescription: 1,
      imageDescription: 1,
      name: 1,
      isPremium: 1,
    });
    res.status(200).json(description);
  } catch (error) {
    next(error);
  }
};

exports.updateModuleAPI = async (req, res, next) => {
  try {
    const result = await validateModule(req.body);
    const { moduleId } = req.params;
    const moduleUpdated = await Module.findByIdAndUpdate(moduleId, result, {
      new: true,
    });
    res.status(200).json(moduleUpdated);
  } catch (error) {
    next(error);
  }
};

exports.updatePositionModuleAPI = async (req, res, next) => {
  try {
    const listModuleId = req.body;
    for (let i = 0; i < listModuleId.length; i++) {
      await Module.findByIdAndUpdate(listModuleId[i], { position: i + 1 });
    }
    res.status(200).json({ message: "Module updated successfully" });
  } catch (error) {
    next(error);
  }
};
