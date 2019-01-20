'use strict';
const Hapi = require('hapi');
const { expect } = require('code');
const { test, experiment, before, beforeEach, after } = exports.lab = require('lab').script();

import buildURI from 'utils/buildUri';
import setup from 'setup';

/**
 * Init a Hapi server
 * @type {Hapi.Server}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const server = new Hapi.Server();

experiment('Users handler', () => {
  before(async ({ context }): Promise<void> => {
    context.handlers = await setup(server);
  });
  beforeEach(async ({ context }): Promise<void> => {
    await context.handlers.user.clear(true);
  });

  test('Returns OK on user registration', async () => {
    const payload = {
      nickname: 'asdqwe',
      password: 'qwelols'
    };

    const response = await server.inject({
      method: 'POST',
      url: '/register',
      payload
    });

    expect(response.statusCode).to.equal(200);
  });
  test('Login works correctly', async ({ context }): Promise<void> => {
    const payload = {
      nickname: 'qwe',
      password: '1234567'
    };

    await context.handlers.user.create(userdata, true);
    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload
    });

    expect(response.statusCode).to.equal(200);
  });
  test('Finds users correctly', async ({ context }): Promise<void> => {
    const payload = {
      nickname: 'monolinks',
      password: 'qwes'
    };

    await context.handlers.user.create(payload, true);

    const result = await context.handlers.user.find({ nickname: payload.nickname }, true);
    expect(result.length).to.equal(1);
  });
  test('Deletes user successfully', async ({ context }): Promise<void> => {
    const payload = {
      nickname: 'monolink',
      password: 'qwes'
    };

    await context.handlers.user.create(payload, true);
    await context.handlers.user.delete(payload, true);

    const result = await context.handlers.user.find({ nickname: payload.nickname });
    expect(result.length).to.equal(0);
  });

  after(async ({ context }): Promise<void> => {
    await context.handlers.user.clear(true);
  });
});
