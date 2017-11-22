'use strict';

let request = require('supertest');
const assert = require('assert');
const Logger = require('node-color-log');
const path = require('path');
const fs = require('fs');
const logger = new Logger();

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

describe('=== Check Upload ===', () => {
  let server;
  beforeEach(done => {
    logger.info('Start a new test case...');
    server = require('../app/app')();
    server.on('started', done);
  });
  afterEach(done => {
    server.stop();
    server.on('end', done);
  });
  it('responds to /upload', done => {
    const dir = config.dataPath;
    if (!fs.existsSync(dir)) {
      logger.debug(`Target ${dir} not exists. Creating...`);
      fs.mkdirSync(dir, '0755');
      fs.chmodSync(dir, '0755');
    }
    logger.debug('Create dummy file to test upload.');
    const filePath = path.join(dir, 'test.jpg');
    const fileUpload = 'test_upload.jpg';
    const filePathUpload = path.join(dir, fileUpload);
    fs.writeFileSync(filePath, '');
    request(server)
      .post('/upload')
      .attach('image', filePath, fileUpload)
      .expect(200)
      .end((err, res) => {
        logger.debug('Check if the file has been upload.')
        assert.equal(fs.existsSync(filePathUpload), true);
        assert.equal(res.body.success, true);
        logger.debug('Comfirmed passed. Clean the testes files.')
        fs.unlinkSync(filePath);
        fs.unlinkSync(filePathUpload);
        done();
      })
  });
});