'use strict';
const Hapi = require('hapi');
const { expect } = require('code');
const { test, experiment, before } = exports.lab = require('lab').script();

import setup from 'setup';

/**
 * Init a Hapi server
 * @type {Hapi.Server}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const server = new Hapi.Server();

experiment('Users handler creates new user without errors', () => {
  before(async () => {
    await setup(server);
  });
  test('Returns OK when user was created', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/user/create?nickname=asdqwe&password=qwelols'
    });

    expect(response.statusCode).to.equal(200);
  });
});
