// TODO Create an authentication system

require('dotenv').config();

import * as Hapi from 'hapi';

import dbConfig from './config/db.config';
import { initDatabase, DatabaseController } from './utils/database';
import { initLoggers, LoggersObject } from './utils/logger';

import Models = require('./models');

const chalked = require('./plugins/chalked');

/**
 * Server initialization
 * @type {Server}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const server: Hapi.Server = new Hapi.Server({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000
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
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const start = async () => {
  try {
    await server.start();
    chalked.blue(`Server running at: ${server.info.uri}`);
    const loggers: LoggersObject = await initLoggers();
    const { connection, handlers }: DatabaseController = await initDatabase(dbConfig.url);

    // User registration example
    const exampleUser: Models.User.Interface = {
      nickname: 'monolink',
      password: 'helloWorld'
    };
    handlers.user.create(exampleUser);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
