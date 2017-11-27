'use strict';

const express = require('express');
const api = express.Router();
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

api.post('/getResult', (req, res) => {
    const target = req.target;
    const uuid = req.uuid;
})

module.exports = api;