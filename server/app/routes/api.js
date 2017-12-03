'use strict';

const express = require('express');
const api = express.Router();
const exec = require('child_process').exec;
const path = require('path');
const Logger = require('node-color-log');
const fs = require('fs');
const logger = new Logger();


const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

api.post('/getResult', (req, res) => {
    let isSuccess = false;
    const target = req.body.target;
    const filename = req.body.filename;

    logger.color('magenta').italic().log(`Receive targer: ${target}, filename: ${filename}`)

    const filePath = path.join(config.dataPath, target, filename);
    logger.color('magenta').log(`Find the image at ${filePath}`)
    // Excute python to run DL
    const pythonFile = path.join(__dirname, '../../python/label_image.py');
    const labelFile = path.join(__dirname, '../../model/retrained_labels.txt');
    const graphFile = path.join(__dirname, '../../model/retrained_graph.pb');
    logger.log(`Python file: ${pythonFile}`)
    const command = `python ${pythonFile} ${filePath} ${labelFile} ${graphFile}`;
    logger.log(`Running command ...`);
    logger.color('blue').italic().log(command);
    exec(command, (error, stdout, stderr) => {
        logger.log(stdout);
        logger.color('red').log(stderr);
        isSuccess = true;
        return res.json({
            success: true,
            result: JSON.parse(stdout),
            message: 'get the result'
        })
        if (error !== null) {
            logger.error(error);
            return res.json({
                success: false,
                message: 'failed to get the result'
            })
        }
    });
    setTimeout(() => {
        if (!isSuccess) {
            return res.json({
                success: false,
                message: 'failed get the result'
            });
        }
    }, 20000)
})

module.exports = api;