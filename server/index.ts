// TODO: Create an authentication system

require('dotenv').config();

import { Server } from 'hapi';
const chalked = require('./plugins/chalked');

import initLoggers from './utils/logger';
import injectRouter from './router';

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

    await initLoggers();
    await injectRouter(server);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
