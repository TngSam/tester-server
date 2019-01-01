import UserSchema = require('./user/schema');
import UserInterface = require('./user/interface');
import UserModel = require('./user/model');

namespace Models {
  export namespace User {
    export let Schema = UserSchema;
    export interface Interface extends UserInterface {}
    export interface Model extends UserModel {}
  }
}

export = Models;
