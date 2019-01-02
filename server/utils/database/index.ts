// TODO Find out how to safely disconnect from the server on process exit

import * as mongoose from 'mongoose';
const chalked = require('plugins/chalked');

/**
 * Initialize a database connection
 * @param url - A database URL
 * @returns {Promise<{mongoose.Connection}>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initDatabase = async (url: string): Promise<mongoose.Connection> => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
  } catch (e) {
    chalked.red(`Failed to connect to the database!`);
    throw e;
  }

  chalked.green(`Successfully connected to the database!`);
  return mongoose.connection;
};

export default initDatabase;
