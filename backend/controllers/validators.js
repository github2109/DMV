const Joi = require("joi");
const license = require("../models/license");

const validator = (schema) => (payload) =>
  schema.validateAsync(payload, { abortEarly: false });

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
});
const stateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});
const licenseSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
});
const moduleSchema = Joi.object({
  name: Joi.string().min(6).max(30).required(),
  titleDescription: Joi.string().min(6).max(100).required(),
  contentDescription: Joi.string().min(10).required(),
  imageDescription: Joi.string().required(),
  isPremium: Joi.boolean().required(),
  position: Joi.number(),
  license: Joi.string(),
  _id: Joi.string(),
});
const questionSchema = Joi.object({
  questionContent: Joi.string().min(10).required(),
  answers: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      content: Joi.string().required(),
      isCorrect: Joi.boolean().required(),
    }).unknown(false)
  ),
  module: Joi.string().required(),
  handBook: Joi.string().min(0),
  image: Joi.string().required(),
  isTestQuestion: Joi.boolean().required(),
  __v: Joi.number(),
  _id: Joi.string(),
});
const examSchema = Joi.object({
  name: Joi.string().min(3).required(),
  numberOfQuestion: Joi.number().min(5).required(),
  timeOfExam: Joi.number().min(10).required(),
});
module.exports = {
  validateUser: validator(userSchema),
  validateState: validator(stateSchema),
  validateLicense: validator(licenseSchema),
  validateModule: validator(moduleSchema),
  validateQuestion: validator(questionSchema),
  validateExam: validator(examSchema),
};
