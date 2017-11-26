'use strict';

const express = require('express');
const uplaod = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const uuid = require('uuid/v1');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

uplaod.post('/', (req, res) => {
    // create an incoming form object
    const form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = false;

    form.parse(req);
    // store all uploads in the target directory
    form.on('field', (name, value) => {
        form.uploadDir = path.join(config.dataPath, value);
    });

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name with UUID
    form.on('file', (field, file) => {
        fs.rename(file.path, path.join(form.uploadDir, `${uuid()}-${file.name}`));
    });

    // log any errors that occur
    form.on('error', err => {
        console.log('An error has occured: \n' + err);
    })

    return res.json({
        success: true,
        message: 'Upload done.'
    })
});

module.exports = uplaod;