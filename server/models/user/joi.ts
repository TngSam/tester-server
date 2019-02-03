import Joi = require('joi');

/**
 * Joi validation for user data
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = {
  nickname: Joi.string().alphanum().min(2).max(18).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9-_]{6,30}$/).required()
};
