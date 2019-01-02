// TODO Find out how to safely disconnect from the server on process exit

import * as mongoose from 'mongoose';
import { invokeHandler, HandlersObject } from 'handlers';
import { ConsoleLogger, DefaultLogger } from 'utils/console';
const chalked = require('plugins/chalked');

/**
 * Interface for object that represents a database controller (handlers and connection)
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export interface DatabaseController {
  readonly connection: mongoose.Connection,
  readonly handlers: HandlersObject
}

/**
 * Initialize a database connection
 * @param url - A database URL
 * @returns {Promise<{connection: mongoose.Connection, handler: HandlersObject}>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export const initDatabase = async (url: string): Promise<DatabaseController> => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
  } catch (e) {
    chalked.red(`Failed to connect to the database!`);
    throw e;
  }

  chalked.green(`Successfully connected to the database!`);

  const db: mongoose.Connection = mongoose.connection;
  const verbose: DefaultLogger = new ConsoleLogger();
  const Handler: HandlersObject = invokeHandler(mongoose, verbose);

  return {
    connection: db,
    handlers: Handler
  };
};
