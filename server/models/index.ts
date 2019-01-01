import UserSchema = require('./user/schema');
import UserJoi = require('./user/joi');
import UserModel = require('./user/model');

namespace Models {
  export namespace User {
    export const Schema = UserSchema;
    export const Joi = UserJoi;
    export interface Model extends UserModel {}
  }
}

export = Models;
