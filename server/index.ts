require('dotenv').config();

import {Server, Auth} from 'hapi';
import getToken from 'utils/getToken';
const AuthBearer = require('hapi-auth-bearer-token');

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
    await server.register(AuthBearer);
    server.auth.strategy('simple', 'bearer-access-token', {
      validate: async (request: any, token: string, h: any) => {
        if (['/login', '/register'].includes(request.url.pathname)) {
          return { isValid: true, credentials: { token } };
        }

        return { isValid: token === getToken, credentials: { token } };
      }
    });
    server.auth.default('simple');

    await server.start();
    await setup(server);

    chalked.blue(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
