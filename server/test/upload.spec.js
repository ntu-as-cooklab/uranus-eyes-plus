'use strict';

let request = require('supertest');
const assert = require('assert');
const path = require('path');
var fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

describe('=== Check Upload ===', () => {
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
  it('responds to /upload', done => {
    const dir = config.dataPath;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, '0755');
      fs.chmodSync(dir, '0755');
    }
    const filePath = path.join(dir, 'test.jpg');
    const fileUpload = 'test_upload.jpg';
    const filePathUpload = path.join(dir, fileUpload);
    fs.writeFileSync(filePath, '');
    request(server)
      .post('/upload')
      .attach('image', filePath, fileUpload)
      .expect(200)
      .end((err, res) => {
        assert.equal(fs.existsSync(filePathUpload), true);
        assert.equal(res.body.success, true);
        // Clean folder
        fs.unlinkSync(filePath);
        fs.unlinkSync(filePathUpload);
        done();
      })
  });
});