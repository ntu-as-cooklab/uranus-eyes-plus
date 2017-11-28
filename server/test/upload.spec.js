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
    const filename = 'test.jpg';
    const target = 'altostratus';
    const filePath = path.join(dir, filename);
    const fileUploadPath = path.join(dir, target);
    fs.writeFileSync(filePath, '');
    request(server)
      .post('/upload')
      .field('target', target)
      .attach('image', filePath, filename)
      .expect(200)
      .end((err, res) => {
        logger.debug('Check if the file has been upload.')
        const files = fs.readdirSync(fileUploadPath);
        // only upload a file
        assert.equal(files.length, 1);
        // comfirm the name is right
        assert.equal(res.body.filename, files[0]);
        assert.equal(res.body.success, true);
        logger.debug('Comfirmed passed. Clean the testes files.')
        done();
      })
  });
});