// TODO Create a better logging system for database operations (i.e. in handler)
// TODO Write type declaration files

import chalk from 'chalk';
import * as Hapi from 'hapi';
import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as logform from 'logform';
const { combine, timestamp, label, printf } = winston.format;
import dbConfig from './config/db.config';

import Models = require('./models');

/**
 * Initialize a database connection
 * @param url - A database URL
 * @returns {Promise<{connection: mongoose.Connection, handler: any}>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initDatabase = async (url: string) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true })
  } catch (e) {
    console.log(chalk.red('Failed to connect to the database!'));
    throw e;
  }

  console.log(chalk.green('Successfully connected to the database!'));
  const db: mongoose.Connection = mongoose.connection;
  const Handler = require('./handlers')(mongoose);
  return {
    connection: db,
    handler: Handler
  };
};

/**
 * Initialize a winston logger
 * @param format - Custom format
 * @param options - Custom logger options
 * @returns {winston.Logger}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initLogger = (format: logform.Format, options: any = {}): winston.Logger => {
  const logger: winston.Logger = winston.createLogger({
    format,
    transports: [
      new winston.transports.File(options.file)
    ]
  });
  return logger;
};

/**
 * Server initialization
 * @type {Server}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const server: Hapi.Server = new Hapi.Server({
  host: 'localhost',
  port: 8000
});

/**
 * Server index route
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
server.route({
  method: 'GET',
  path: '/',
  handler (req: any, h: any) {
    return 'Hello World';
  }
});

/**
 * Start a server
 * @returns {Promise<void>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const start = async () => {
  try {
    await server.start();
    console.log(chalk.blue(`Server running at: ${server.info.uri}`));

    const db = await initDatabase(dbConfig.url);

    // Custom logging format example
    const dbActionLogFormat: logform.Format = combine(
      label({ label: 'Database' }),
      timestamp({
        format: 'HH:mm:ss'
      }),
      printf((info: logform.TransformableInfo) => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
      })
    );
    const dbLogger = await initLogger(dbActionLogFormat, {
      file: {
        filename: 'db.log',
        maxSize: 5000000
      }
    });

    // User registration example
    const exampleUser: Models.User.Interface = {
      nickname: 'monolink',
      password: 'helloWorld'
    };
    dbLogger.info('Creating a user...');
    dbLogger.info(`User data: ${JSON.stringify(exampleUser)}`);
    db.handler.user.create(exampleUser);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
