import { Logger, loggers } from 'winston';

import initDatabaseLogger from './database';

export interface LoggersObject {
  [key: string]: Logger;
}

export const initLoggers = async (): Promise<LoggersObject> => {
  const DB_LOGGER_NAME = await initDatabaseLogger();

  return {
    database: loggers.get(DB_LOGGER_NAME)
  };
};
