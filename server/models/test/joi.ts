import Joi = require('joi');

import Question = require('./question/joi');
import Result = require('./result/joi');

/**
 * Joi validation for test
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = {
  name: Joi.string().required(),
  answers: Joi.array().items(Joi.array().items(Joi.string().required())).required(),
  questions: Joi.array().items(Question).required(),
  results: Joi.object().pattern(/^/, Result).required()
};
