import { Server } from 'hapi';

import { url } from 'config/db.config';
import initDatabase from 'utils/database';
import { invokeHandlers, HandlersObject } from 'handlers';
import injectRouter from 'router';

/**
 * Setup a server (init database, router and handlers)
 * @param server
 * @returns {Promise<void>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const setup = async (server: Server): Promise<void | HandlersObject> => {
  await initDatabase(url);
  return await injectRouter(server, await invokeHandlers());
}

export default setup;
