import { Logger, loggers } from 'winston';

import initDatabaseLogger from './database';

/**
 * Interface which represents an object of loggers
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export interface LoggersObject {
  [key: string]: Logger;
}

/**
 * Init loggers
 * @returns {Promise<{LoggersObject}>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export const initLoggers = async (): Promise<LoggersObject> => {
  const DB_LOGGER_NAME = await initDatabaseLogger();

  return {
    database: loggers.get(DB_LOGGER_NAME)
  };
};
