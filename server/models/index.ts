import UserSchema = require('./user/schema');
import UserJoi = require('./user/joi');
import UserModel = require('./user/model');

import TestSchema = require('./test/schema');
import TestJoi = require('./test/joi');
import TestModel = require('./test/model');

namespace Models {
  export namespace User {
    export const Schema = UserSchema;
    export const Joi = UserJoi;
    export interface Model extends UserModel {}
  }

  export namespace Test {
    export const Schema = TestSchema;
    export const Joi = TestJoi;
    export interface Model extends TestModel {}
  }
}

export = Models;
