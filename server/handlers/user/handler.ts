import { Mongoose, Model, Query } from 'mongoose';
import { Handler } from 'handlers';
import { Logger } from 'winston';
import { DefaultLogger, ConsoleLogger } from 'utils/console';
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
  verbose: DefaultLogger;
  model: Model<Models.User.Model>;
  constructor (mongooseInstance: Mongoose, logger: Logger, verbose: DefaultLogger) {
    this.mongoose = mongooseInstance;
    this.logger = logger;
    this.verbose = verbose;

    this.model = mongooseInstance.model('User', Models.User.Schema);
  }

  /**
   * Create new user
   * @method
   * @param data - User data
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  create = async (data: Models.User.Interface, verbose: boolean = false): Promise<any> => {
    try {
      await new this.model(data).save();

      if (verbose) {
        this.verbose.success('New user was created.');
      }

      this.logger.info('New user was created.', {
        handler: 'user',
        method: 'create',
        data
      });
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Delete user
   * @param data - User data
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  delete = async (data: any, verbose: boolean = false): Promise<any> => {
    const documentsCount: number = await this.model.find({ nickname: data.nickname }).estimatedDocumentCount();
    if (documentsCount > 0) {
      this.model.deleteOne({ nickname: data.nickname }, (error: any) => {
        if (error) return console.error(error);

        if (verbose) {
          this.verbose.success(`User ${data.nickname} was deleted.`);
        }

        this.logger.info('User was deleted.', {
          handler: 'user',
          method: 'delete',
          data
        });
      });
    } else {
      this.verbose.error('Wow! No documents here.');
    }
  }

  /**
   *
   * @param data - Search criteria
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  find = async (data: any, verbose: boolean = false): Promise<any> => {
    try {
      const result = await this.model.find(data, (error: any, arr: any) => {
        if (error) throw error;

        if (verbose) {
          this.verbose.info(`Found ${arr.length} entities by search.`);
        }

        return Promise.resolve(arr);
      });
      return result;
    } catch (error) {
      return console.error(error);
    }
  }
}

export = UserHandler;
