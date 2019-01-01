import { Mongoose, Model } from 'mongoose';
import { loggers, Logger } from 'winston';
import { DefaultLogger } from 'utils/console';
import UserHandler = require('./user/handler');

export interface Handler {
  mongoose: Mongoose;
  logger: Logger;
  verbose: DefaultLogger;
  model: Model<any>;

  create: (data: any, verbose?: boolean) => void;
  delete: (data: any, verbose?: boolean) => void;
  find: (data: any, verbose?: boolean) => void;
}

export interface HandlersObject {
  [key: string]: Handler;
}

/**
 * Create a handlers controller
 * @param mongooseInstance - Mongoose instance
 * @returns {{user: UserHandler}}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export const invokeHandler = (mongooseInstance: Mongoose, console: DefaultLogger): HandlersObject => {
  const logger: Logger = loggers.get('database');
  return {
    user: new UserHandler(mongooseInstance, logger, console)
  }
};
