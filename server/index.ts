// TODO: Create an authentication system

require('dotenv').config();

import {
  Server, Request, ResponseToolkit
} from 'hapi';
import boom = require('boom');
import joi = require('joi');

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
const server: Server = new Server({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000
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

    /**
     * Create user route
     * @author Samir Amirseidov <famirseidov@gmail.com>
     */
    server.route({
      method: 'POST',
      path: '/user/create',
      async handler (req: Request, h: ResponseToolkit) {
        try {
          await handlers.user.create(req.query, true);
          return h.response({
            text: 'OK',
            code: 200
          }).code(200);
        } catch (error) {
          return boom.badImplementation();
        }
      },
      options: {
        validate: {
          query: Models.User.Joi
        }
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
