const config = require("../utils/config");
const Question = require("../models/question");
const {
  getModuleByModuleId,
  updateModuleAfterCreateQuestion,
  updateModuleAfterRemoveQuestion,
} = require("../controllers/module");

exports.getAllQuestionsForExamAPI = async (req, res, next) => {
  try {
    const moduleId = req.query.moduleId;
    const questions = await getAllQuestionsForModule(moduleId, true);
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
    const moduleId = req.query.moduleId;
    const questions = await getAllQuestionsForModule(moduleId, false);
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
const getAllQuestionsForModule = async (moduleId, isExam) => {
  const module = await getModuleByModuleId(moduleId);
  if (!module) {
    return null;
  } else {
    const listQuestions = await module.questions;
    const results = listQuestions.filter(
      (question) => question.isTestQuestion === isExam
    );
    return results;
  }
};

exports.createQuestionAPI = async (req, res, next) => {
  try {
    const moduleId = req.query.moduleId;
    const { questionContent, answers, isTestQuestion, image, handBook } =
      req.body;
    const check = await Question.findOne({ questionContent: questionContent });
    if (check) {
      return res.status(200).json({
        message:
          "This question was already exists. Please use another question",
      });
    }
    const newQuestion = await new Question({
      questionContent,
      answers,
      isTestQuestion,
      image,
      handBook,
    });
    const savedQuestion = await newQuestion.save();
    const addIntoModule = await updateModuleAfterCreateQuestion(
      moduleId,
      savedQuestion.id
    );
    if (!addIntoModule) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    res
      .status(201)
      .json({ savedQuestion, message: "Question was created successfully" });
  } catch (error) {
    next(error);
  }
};
exports.deleteQuestionByIdAPI = async (req, res, next) => {
  try {
    const questionId = req.query.id;
    const moduleId = req.query.moduleId;
    const deletedQuestion = await Question.findByIdAndRemove({
      _id: questionId,
    });
    if (!deletedQuestion) {
      return res.status(500).json({ message: "Question not found" });
    }
    const deleteQuestionInModule = await updateModuleAfterRemoveQuestion(
      moduleId,
      questionId
    );
    if (!deleteQuestionInModule) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res
      .status(200)
      .json({ deletedQuestion, message: "Question was deleted successfully" });
  } catch (error) {
    next(error);
  }
};
exports.updateQuestionByIdAPI = async (req,res,next) => {
  try {
    const {
      questionContent,handBook,answers,isTestQuestion,image
    } = req.body
    const questionId = req.query.id;
    const updatedQuestion = await Question.findByIdAndUpdate({_id:questionId},{
      questionContent,
      handBook,
      answers,
      isTestQuestion,
      image
    },{new:true})
    if(updatedQuestion){
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(201).json(updatedQuestion)
  } catch (error) {
    next(error);
  }
}