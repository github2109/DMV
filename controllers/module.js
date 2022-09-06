const Module = require("../models/module");
const State = require("../models/state");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
exports.getModuleByModuleId = async (moduleId) => {
  return await Module.findById(moduleId).populate("questions");
};

exports.updateModuleAfterRemoveQuestion = async (moduleId, questionId) => {
  const module = await Module.findById(moduleId);
  module.questions = module.questions.filter(
    (question) => question.toString() !== questionId
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

exports.getModuleByStateIdAndLicenseId = async (stateId, licenseId) => {
  return await Module.find({ license: licenseId, states: stateId }).populate("questions");
};

exports.getModuleByStateIdAndLicenseIdAPI = async (req, res, next) => {
  try {
    const { stateId, licenseId } = req.query;
    console.log(req.query);
    const modules = await Module.find({ license: licenseId, states: stateId })
      .select({ name: 1, position: 1, questions: 1 })
      .sort({ position: 1 });
    let modulesExec = [];
    modules.forEach((module) => {
      modulesExec.push({
        _id: module._id,
        name: module.name,
        position: module.position,
        numberOfQuestion: module.questions.length,
      });
    });
    res.json(modulesExec);
  } catch (error) {
    next(error);
  }
};

exports.getModuleByLicenseIdAPI = async (req, res, next) => {
  try {
    const { licenseId } = req.params;
    const modules = await Module.find({ license: licenseId })
      .select({
        name: 1,
        position: 1
      })
      .sort({ position: 1 });
    res.status(200).json(modules);
  } catch (error) {
    next(error);
  }
};

exports.createModuleAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
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
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    await Module.findByIdAndDelete(req.params.moduleId);
    res.status(200).json({ message: "Module deleted" });
  } catch (error) {
    next(error);
  }
};

exports.addModuleToStateAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
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
    return res.status(200).json({ moduleSaved });
  } catch (error) {
    next(error);
  }
};

exports.removeModuleOfStateAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const { stateId, moduleId } = req.params;
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
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const { moduleId } = req.params;
    const moduleUpdated = await Module.findByIdAndUpdate(moduleId, req.body,{new:true});
    res.status(200).json(moduleUpdated);
  } catch (error) {
    next(error);
  }
};

exports.updatePositionModuleAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const listModuleId = req.body;
    for (let i = 0; i < listModuleId.length; i++) {
      await Module.findByIdAndUpdate(listModuleId[i], { position: i + 1 });
    }
    res.status(200).json({ message: "Module updated successfully" });
  } catch (error) {
    next(error);
  }
};
