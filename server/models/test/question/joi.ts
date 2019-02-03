import Joi = require('joi');

/**
 * Joi validation for test question
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = Joi.object().keys({
  name: Joi.string().required()
});
