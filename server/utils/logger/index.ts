import initDatabaseLogger from './database';

/**
 * Init loggers
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initLoggers = async (): Promise<void> => {
  await initDatabaseLogger();
};
export default initLoggers;
