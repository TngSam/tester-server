import { loggers, Logger } from 'winston';

import UserHandler = require('./user/handler');

/**
 * Create a handlers controller
 * @param mongooseInstance - Mongoose instance
 * @returns {{user: UserHandler}}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const invokeHandler = (mongooseInstance: any) => {
  const logger: Logger = loggers.get('database');
  return {
    user: new UserHandler(mongooseInstance, logger)
  }
};

export = invokeHandler;
