const User = require("../models/user");
const State = require("../models/state");
const License = require("../models/license");
const Question = require("../models/question");
const Exam = require("../models/exam");
const Module = require("../models/module");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};
const statesInDb = async () => {
  const states = await State.find({});
  return states.map((state) => state.toJSON());
};
const licensesInDb = async () => {
  const licenses = await License.find({});
  return licenses.map((license) => license.toJSON());
};
const examsInDbByStateIdAndLicenseId = async (stateId, licenseId) => {
  const exams = await Exam.find({ state: stateId, license: licenseId });
  return exams.map((exam) => exam.toJSON());
};
const examsInDb = async () => {
  const exams = await Exam.find({});
  return exams.map((exam) => exam.toJSON());
};
const questionsForModuleDb = async (moduleId) => {
  const questions = await Question.find({ module: moduleId });
  return questions.map((question) => question.toJSON());
};
const questionsForExamDb = async (examId) => {
  const questions = await Question.find({
    module: { $in: modules },
    isTestQuestion: true,
  });
  return questions.map((question) => question.toJSON());
};
const questionsInDb = async () => {
  const questions = await Question.find({});
  return questions.map((question) => question.toJSON());
};
const modulesInDb = async () => {
  const modules = await Module.find({});
  return modules.map((module) => module.toJSON());
};
const modulesInLicenseDb = async (licenseId) => {
  const modules = await Module.find({ license: licenseId });
  return modules.map((module) => module.toJSON());
};
const modulesInStateAndLicenseDb = async (stateId, licenseId) => {
  const modules = await Module.find({ license: licenseId, states: stateId })
    .select({ name: 1, position: 1 })
    .sort({ position: 1 });
  return modules.map((module) => module.toJSON());
};
const getTokenForTest = async () => {
  const passwordHash = await bcrypt.hash("secret", 12);
  const user = new User({
    username: "root",
    passwordHash,
    role: "ADMIN",
  });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user.id,
    role: user.role,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  return token;
};
module.exports = {
  usersInDb,
  statesInDb,
  licensesInDb,
  examsInDbByStateIdAndLicenseId,
  examsInDb,
  questionsForModuleDb,
  questionsForExamDb,
  modulesInDb,
  questionsInDb,
  modulesInLicenseDb,
  modulesInStateAndLicenseDb,
  getTokenForTest,
};
