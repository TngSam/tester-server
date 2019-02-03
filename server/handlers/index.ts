// TODO: Refactor repeating code
import { Model } from 'mongoose';
import { Logger } from 'winston';
import { initLoggers, LoggersObject } from 'utils/logger/winston';
import { DefaultLogger, ConsoleLogger } from 'utils/logger/console';

import UserHandler = require('./user/handler');
import TestHandler = require('./test/handler');

/**
 * Interface for basic handlers
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export interface Handler {
  logger: Logger;
  verbose: DefaultLogger;
  model: Model<any>;

  create: (data: any, verbose?: boolean) => Promise<void>;
  delete: (data: any, verbose?: boolean) => Promise<void>;
  find: (data: any, verbose?: boolean) => Promise<any>;
  clear: (verbose?: boolean) => Promise<void>;
}

export interface HandlersObject {
  [key: string]: Handler;
}

/**
 * Create a handlers controller
 * @param mongooseInstance - Mongoose instance
 * @returns {HandlersObject}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export const invokeHandlers = async (): Promise<HandlersObject> => {
  const loggers: LoggersObject = await initLoggers();
  const console: DefaultLogger = new ConsoleLogger();

  return {
    user: new UserHandler(loggers.database, console),
    test: new TestHandler(loggers.database, console)
  }
};
