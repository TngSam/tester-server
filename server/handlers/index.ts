import handler = require('./index');
import { Mongoose } from 'mongoose';
import { loggers, Logger } from 'winston';

import UserHandler = require('./user/handler');

export interface Handler {
  mongoose: Mongoose;
  logger: Logger;
  create: (data: any, verbose?: boolean) => void;
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
export const invokeHandler = (mongooseInstance: Mongoose): HandlersObject => {
  const logger: Logger = loggers.get('database');
  return {
    user: new UserHandler(mongooseInstance, logger)
  }
};
