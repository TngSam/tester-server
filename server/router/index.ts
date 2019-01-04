import { Server, Request, ResponseToolkit } from 'hapi';
import boom = require('boom');

import { HandlersObject } from 'handlers';
import { User } from 'models';

/**
 * Inject API endpoints to custom Hapi server
 * @param server {Server} - Hapi server
 * @param handlers {HandlersObject} - Handlers object
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const injectRouter = async (server: Server, handlers: HandlersObject): Promise<void | HandlersObject> => {
  /**
   * Create user route
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  await server.route({
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

  /**
   * Delete user route
   * @author Samir Amirseidov <famirseidov@gmail.com>
   */
  await server.route({
    method: 'POST',
    path: '/user/delete',
    async handler (req: Request, h: ResponseToolkit) {
      try {
        await handlers.user.delete(req.query, true);
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
        query: {
          nickname: User.Joi.nickname
        }
      }
    }
  });

  if (process.env.NODE_ENV === 'test') {
    return handlers;
  }
}
export default injectRouter;
