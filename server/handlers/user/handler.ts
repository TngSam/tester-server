const chalk = require('chalk');
import Models = require('./../../models');

/**
 * Handle database user related operations
 * @class
 * @prop mongooseInstance - Mongoose instance
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
class UserHandler {
  mongoose: any;
  constructor (mongooseInstance: any) {
    this.mongoose = mongooseInstance;
  }

  /**
   * Create a new user
   * @method
   * @param data - User data
   * @param verbose - Enable logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  create (data: Models.User.Interface, verbose: boolean = false) {
    const User: any = this.mongoose.model('User', Models.User.Schema);
    new User(data).save((error: any) => {
      if (error) return console.error(chalk.red(error));
    });
  }
}

export = UserHandler;
