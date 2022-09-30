const User = require("../models/user");
const State = require("../models/state");
const License = require("../models/license");
const Question = require("../models/question");
const Exam = require("../models/exam");
const Module = require("../models/module");
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
  const modules = await Module.find({ license: licenseId, state: stateId });
  return modules.map((module) => module.toJSON());
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
};
