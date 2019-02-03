import { Server } from 'hapi';
import Joi = require('joi');

import { HandlersObject } from 'handlers';

import createError from 'utils/createError';

import { Test } from 'models';

const init = async (server: Server, handlers: HandlersObject) => {
  // Create test
  await server.route({
    method: 'POST',
    path: '/test/create',
    async handler (req: any, h) {
      try {
        await handlers.test.create(req.payload, true);
        return h.response({
          text: 'OK'
        });
      } catch (error) {
        h.response(createError(500));
      }
    }
  });

  // Delete test
  await server.route({
    method: 'POST',
    path: '/test/delete',
    async handler (req: any, h) {
      try {
        await handlers.test.delete(req.payload, true);
        return h.response({
          text: 'OK'
        });
      } catch (error) {
        return h.response(createError(500));
      }
    },
    options: {
      validate: {
        payload: Joi.object().keys({
          id: Joi.number().required()
        })
      }
    }
  });

  // Get all tests or specific test
  await server.route({
    method: 'GET',
    path: '/test/{id?}',
    async handler (req: any, h) {
      try {
        const query = req.payload.id ? { nickname: req.payload.id } : req.payload;
        const data = await handlers.test.find(query, true);
        return h.response({
          data
        });
      } catch (error) {
        return h.response(createError(500));
      }
    }
  });
}

export default init;
