import { Server } from 'hapi';

const corsHeaders = require('hapi-cors-headers');
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
  // Log in
  await server.route({
    method: 'POST',
    path: '/login',
    async handler (req: any, h) {
      try {
        const result = await handlers.user.find({ nickname: req.payload.nickname });
        if (result.length) {
          const user = result[0];
          if (user.password === req.payload.password) {
            return h.response({
              text: 'OK'
            }).code(200);
          } else {
            return boom.badRequest('Invalid password');
          }
        } else {
          return boom.notFound('User not found');
        }
      } catch (error) {
        return boom.badImplementation(error);
      }
    },
    options: {
      validate: {
        query: {
          nickname: User.Joi.nickname,
          password: User.Joi.password
        }
      }
    }
  });

  // Register
  await server.route({
    method: 'POST',
    path: '/register',
    async handler (req: any, h) {
      try {
        const result = await handlers.user.find({ nickname: req.payload.nickname });
        if (!result.length) {
          await handlers.user.create(req.payload, true);
          return h.response({
            text: 'OK'
          }).code(200);
        } else {
          return boom.expectationFailed('User is already exist');
        }
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

  // Delete user route
  await server.route({
    method: 'POST',
    path: '/user/delete',
    async handler (req: any, h) {
      try {
        await handlers.user.delete(req.payload, true);
        return h.response({
          text: 'OK'
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

  // Get all users or specific user
  await server.route({
    method: 'GET',
    path: '/user/{nickname?}',
    async handler (req: any, h) {
      try {
        const query = req.payload.nickname ? { nickname: req.payload.nickname } : req.payload;
        const data = await handlers.user.find(query, true);
        return h.response({
          data
        }).code(200);
      } catch (error) {
        return boom.badImplementation(error);
      }
    }
  });

  await server.ext('onPreResponse', corsHeaders);


  if (process.env.NODE_ENV === 'test') {
    return handlers;
  }
}
export default injectRouter;
