import { loggers } from 'winston';

import initDatabaseLogger from './database';

const initLoggers = async () => {
  const DB_LOGGER_NAME = await initDatabaseLogger();

  return {
    database: loggers.get(DB_LOGGER_NAME)
  };
};
export default initLoggers;
