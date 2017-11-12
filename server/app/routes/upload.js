'use strict';

const express = require('express');
const uplaod = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

uplaod.post('/', (req, res) => {
    // create an incoming form object
    const form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = false;
    // store all uploads in the /uploads directory
    form.uploadDir = config.dataPath;

    form.parse(req);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', (field, file) => {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
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