// TODO Find out how to safely disconnect from the server on process exit

import * as mongoose from 'mongoose';
import { invokeHandler, HandlersObject } from 'handlers';
const chalked = require('plugins/chalked');

export interface DatabaseController {
  connection: mongoose.Connection,
  handlers: HandlersObject
}

/**
 * Initialize a database connection
 * @param url - A database URL
 * @returns {Promise<{connection: mongoose.Connection, handler: any}>}
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
  const Handler: HandlersObject = invokeHandler(mongoose);
  return {
    connection: db,
    handlers: Handler
  };
};
