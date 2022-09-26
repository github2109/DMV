const Question = require("../models/question");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const {
  getModuleByModuleId,
  updateModuleAfterCreateQuestion,
  updateModuleAfterRemoveQuestion,
  getModuleByStateIdAndLicenseId,
} = require("../controllers/module");
const { getExamByExamId } = require("../controllers/exam");

exports.getQuestionsForExamAPI = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const exam = await getExamByExamId(examId);
    const modules = await getModuleByStateIdAndLicenseId(
      exam.state,
      exam.license
    );
    const listQuestions = [];
    modules.forEach((module) => listQuestions.push(...module.questions));
    if (listQuestions.length <= exam.numberOfQuestion)
      res.status(200).json(listQuestions);
    const questions = [];
    for (let i = 0; i < exam.numberOfQuestion; i++) {
      const index = Math.floor(Math.random() * listQuestions.length);
      questions.push(listQuestions[index]);
      listQuestions.splice(index, 1);
    }
    if (!questions) {
      return res.status(500).json({
        message: "No questions found",
      });
    }
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

exports.getAllQuestionsForModuleAPI = async (req, res, next) => {
  try {
    const moduleId = req.params.moduleId;
    const module = await getModuleByModuleId(moduleId);
    if (!module.questions) {
      return res.status(500).json({
        message: "No questions found",
      });
    }
    res.status(200).json(module.questions);
  } catch (error) {
    next(error);
  }
};

exports.createQuestionAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const { moduleId } = req.body;
    const { question } = req.body;
    const check = await Question.findOne({
      questionContent: question.questionContent,
    });
    if (check) {
      return res.status(200).json({
        message:
          "This question was already exists. Please use another question",
      });
    }
    const newQuestion = await new Question(question);
    const savedQuestion = await newQuestion.save();
    const addIntoModule = await updateModuleAfterCreateQuestion(
      moduleId,
      savedQuestion._id
    );
    if (!addIntoModule) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error);
  }
};
exports.deleteQuestionByIdAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const {questionId} = req.params;
    const deletedQuestion = await Question.findByIdAndRemove({
      _id: questionId,
    });
    if (!deletedQuestion) {
      return res.status(500).json({ message: "Question not found" });
    }
    const deleteQuestionInModule = await updateModuleAfterRemoveQuestion(questionId);
    if (!deleteQuestionInModule) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json(deletedQuestion);
  } catch (error) {
    next(error);
  }
};
exports.updateQuestionByIdAPI = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
    const questionId = req.params.id;
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: questionId },
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(201).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

exports.getListQuestionForExam = async (listModules) => {
  try {
    const listQuestions = null;
    for (let i = 0; i < listModules.length; i++) {
      listQuestionsOfModule = await Question.getListQuestionForExam(
        listModules[i],
        true
      );
      listQuestions = await listQuestions.push(listQuestionsOfModule);
    }
    if (!listQuestions) return null;
    return listModule;
  } catch (error) {
    console.log(error);
  }
};