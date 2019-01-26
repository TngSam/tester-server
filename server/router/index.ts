import { Server } from 'hapi';
import getToken from 'utils/getToken';

const corsHeaders = require('hapi-cors-headers');

import createError from 'utils/createError';

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
              text: 'OK',
              token: getToken
            });
          } else {
            return h.response(createError('Invalid password.'));
          }
        } else {
          return h.response(createError('User not found.'));
        }
      } catch (error) {
        return h.response(createError(500));
      }
    },
    options: {
      validate: {
        payload: {
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
          });
        } else {
          return h.response(createError('User already exists.'));
        }
      } catch (error) {
        return h.response(createError(500));
      }
    },
    options: {
      validate: {
        payload: User.Joi
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
        });
      } catch (error) {
        return h.response(createError(500));
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
        });
      } catch (error) {
        return h.response(createError(500));
      }
    }
  });

  await server.ext('onPreResponse', corsHeaders);


  if (process.env.NODE_ENV === 'test') {
    return handlers;
  }
}
export default injectRouter;
