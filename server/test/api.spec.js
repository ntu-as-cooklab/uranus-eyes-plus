'use strict';

let request = require('supertest');
const assert = require('assert');
const Logger = require('node-color-log');
const path = require('path');
const fs = require('fs');
const logger = new Logger();

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

describe('=== Check API ===', () => {
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
    it('Test api getResult', done => {
        const dir = config.dataPath;
        const filename = 'cirrus.jpg';
        const target = 'cirrus';
        const targetImgPath = path.join(dir, target, filename);
        logger.debug('Copy test image to data-test');
        fs.createReadStream(path.join(__dirname, 'test-img', filename))
            .pipe(fs.createWriteStream(targetImgPath));
        logger.debug(targetImgPath);
        assert.equal(fs.existsSync(targetImgPath), true);
        request(server)
            .post('/api/getResult')
            .send({
                target: target,
                filename: filename
            })
            .expect(200)
            .end((err, res) => {
                logger.info(res.body.result);
                assert.equal(res.body.success, true);
                done();
            })
    }).timeout(20000);;
});