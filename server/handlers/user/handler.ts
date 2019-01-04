import { Model, model } from 'mongoose';
import { Handler } from 'handlers';
import { Logger } from 'winston';
import { DefaultLogger } from 'utils/logger/console';
import { User } from 'models';

/**
 * Handle database user related operations
 * @class
 * @prop logger {Logger} - Winston logger
 * @prop verbose {DefaultLogger} - Custom console logger for verbose messages
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
class UserHandler implements Handler {
  logger: Logger;
  verbose: DefaultLogger;
  model: Model<User.Model>;

  constructor (logger: Logger, verbose: DefaultLogger) {
    this.logger = logger;
    this.verbose = verbose;
    this.model = model('User', User.Schema);
  }

  /**
   * Create new user
   * @method
   * @param data - User data
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  create = async (data: any, verbose: boolean = false): Promise<void> => {
    try {
      await new this.model(data).save();

      if (verbose) {
        this.verbose.success(`New user '${data.nickname}' was created.`);
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
  delete = async (data: any, verbose: boolean = false): Promise<void> => {
    const documentsCount: number = await this.model.find(data).countDocuments();
    if (documentsCount > 0) {
      try {
        await this.model.deleteOne({ nickname: data.nickname });
        if (verbose) {
          this.verbose.success(`User '${data.nickname}' has been deleted.`);
        }
        this.logger.info('User was deleted.', {
          handler: 'user',
          method: 'delete',
          data
        });
      } catch (error) {
        throw error;
      }
    } else {
      this.verbose.error('No documents were found during the search.');
    }
  }
  /**
   * Find users
   * @param data - Search criteria
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  find = async (data: any, verbose: boolean = false): Promise<any> => {
    try {
      const result = await this.model.find(data, (error: any, arr: any) => {
        if (error) throw error;

        if (verbose) {
          this.verbose.info(`Found ${arr.length} document(s) by search.`);
        }

        return Promise.resolve(arr);
      });
      return result;
    } catch (error) {
      return console.error(error);
    }
  }
  /**
   * Clear collection
   * @param verbose - Enable console logging or not
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  clear = async (verbose: boolean = false): Promise<void> => {
    try {
      await this.model.deleteMany({});
      if (verbose) {
        this.verbose.success('Collection has been cleared.');
      }

      this.logger.info('Collection was cleared.', {
        handler: 'user',
        method: 'clear'
      });
    } catch (error) {
      throw error;
    }
  }
}

export = UserHandler;
