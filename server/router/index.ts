import { Server } from 'hapi';

import initUserRouter from './user';
import initTestRouter from './test';

const corsHeaders = require('hapi-cors-headers');

import { HandlersObject } from 'handlers';

/**
 * Inject API endpoints to custom Hapi server
 * @param server {Server} - Hapi server
 * @param handlers {HandlersObject} - Handlers object
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const injectRouter = async (server: Server, handlers: HandlersObject): Promise<void | HandlersObject> => {
  await initUserRouter(server, handlers);
  await initTestRouter(server, handlers);

  await server.ext('onPreResponse', corsHeaders);

  if (process.env.NODE_ENV === 'test') {
    return handlers;
  }
}
export default injectRouter;
