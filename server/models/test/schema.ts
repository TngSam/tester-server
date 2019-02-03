const Schema = require('mongoose').Schema;

/**
 * Mongoose test schema
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export = new Schema({
  name: String,
  answers: Array,
  questions: Array,
  results: Array
});
