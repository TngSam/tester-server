const Schema = require('mongoose').Schema;

/**
 * Mongoose user schema
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = new Schema({
  nickname: String,
  password: String
});
