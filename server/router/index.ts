import { Server, Request, ResponseToolkit } from 'hapi';
import boom = require('boom');

import { url } from 'config/db.config';
import { initDatabase, DatabaseController } from 'utils/database';
import { User } from 'models';

/**
 * Inject API endpoints to custom Hapi server
 * @param server - Hapi server
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const injectRouter = async (server: Server): Promise<void> => {
  const { handlers }: DatabaseController = await initDatabase(url);

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
        return boom.badImplementation(error);
      }
    },
    options: {
      validate: {
        query: User.Joi
      }
    }
  });
}
export default injectRouter;
