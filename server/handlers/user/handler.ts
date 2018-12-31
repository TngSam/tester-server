import { Mongoose, Model } from 'mongoose';
import { Handler } from 'handlers';
import { Logger } from 'winston';
import Models = require('models');

/**
 * Handle database user related operations
 * @class
 * @prop mongooseInstance - Mongoose instance
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
class UserHandler implements Handler {
  mongoose: Mongoose;
  logger: Logger;
  constructor (mongooseInstance: Mongoose, logger: Logger) {
    this.mongoose = mongooseInstance;
    this.logger = logger;
  }

  /**
   * Create a new user
   * @method
   * @param data - User data
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  create = (data: Models.User.Interface, verbose: boolean = false): void => {
    const User: Model = this.mongoose.model('User', Models.User.Schema);
    new User(data).save((error: any) => {
      if (error) return console.error(error);
      this.logger.info('New user was created.', {
        handler: 'user',
        method: 'create',
        data
      });
    });
  }
}

export = UserHandler;
