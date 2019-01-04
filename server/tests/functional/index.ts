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

  test('Returns OK on user creation', async () => {
    const userdata = {
      nickname: 'asdqwe',
      password: 'qwelols'
    };

    const response = await server.inject({
      method: 'POST',
      url: buildURI('/user/create', userdata)
    });

    expect(response.statusCode).to.equal(200);
  });
  test('Finds users correctly', async ({ context }): Promise<void> => {
    const userdata = {
      nickname: 'monolinks',
      password: 'qwes'
    };

    await context.handlers.user.create(userdata, true);

    const result = await context.handlers.user.find({ nickname: userdata.nickname }, true);
    expect(result.length).to.equal(1);
  });
  test('Deletes user successfully', async ({ context }): Promise<void> => {
    const userdata = {
      nickname: 'monolink',
      password: 'qwes'
    };

    await context.handlers.user.create(userdata, true);
    await context.handlers.user.delete(userdata, true);

    const result = await context.handlers.user.find({ nickname: userdata.nickname });
    expect(result.length).to.equal(0);
  });

  after(async ({ context }): Promise<void> => {
    await context.handlers.user.clear(true);
  });
});
