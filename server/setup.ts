import { Server } from 'hapi';

import { url } from 'config/db.config';
import initDatabase from 'utils/database';
import { invokeHandlers } from 'handlers';
import injectRouter from 'router';

/**
 * Setup a server (init database, router and handlers)
 * @param server
 * @returns {Promise<void>}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const setup = async (server: Server): Promise<void> => {
  await initDatabase(url);
  await injectRouter(server, await invokeHandlers());
}

export default setup;
