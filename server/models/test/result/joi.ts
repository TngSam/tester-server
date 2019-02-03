import Joi = require('joi');

/**
 * Joi validation for test result
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = Joi.object().keys({
  text: Joi.string().required(),
  img: Joi.string()
});
