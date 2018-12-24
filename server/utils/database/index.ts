// TODO Find out how to safely disconnect from the server on process exit

import * as mongoose from 'mongoose';
const req = require('app-root-path').require;
const chalked = req('server/plugins/chalked');

/**
 * Initialize a database connection
 * @param url - A database URL
 * @returns {Promise<{connection: mongoose.Connection, handler: any}>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initDatabase = async (url: string) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
  } catch (e) {
    chalked.red(`Failed to connect to the database!`);
    throw e;
  }

  chalked.green(`Successfully connected to the database!`);
  const db: mongoose.Connection = mongoose.connection;
  const Handler = req('server/handlers')(mongoose);
  return {
    connection: db,
    handlers: Handler
  };
};

export default initDatabase;
