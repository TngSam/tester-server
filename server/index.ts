// TODO: Create an authentication system

require('dotenv').config();

import { Server } from 'hapi';
const chalked = require('plugins/chalked');

import setup from 'setup';

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
    await setup(server);

    chalked.blue(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
