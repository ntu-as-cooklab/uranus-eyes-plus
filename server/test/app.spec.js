'use strict';

let request = require('supertest');

describe('=== Check Express ===', () => {
  let server;
  beforeEach(done => {
    console.log('   -------');
    server = require('../app/app')();
    server.on('started', done);
  });
  afterEach(done => {
    server.stop();
    server.on('end', done);
  });
  it('responds to /', done => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});