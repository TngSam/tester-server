import UserSchema = require('./user/schema');
import UserInterface = require('./user/interface');

namespace Models {
  export namespace User {
    export let Schema = UserSchema;
    export interface Interface extends UserInterface {}
  }
}

export = Models;
