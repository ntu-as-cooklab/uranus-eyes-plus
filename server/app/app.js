'use strict';

// Instant of Server
function runServer() {
  // ===== Express =====
  const express = require('express');
  const app = express();

  // ===== Require Packages ======
  const path = require('path');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const mongoose = require('mongoose');
  const cors = require('cors');

  // ===== Config =====
  const env = process.env.NODE_ENV || 'development';
  const config = require('../config')[env];

  // ===== Mongo DB =====
  mongoose.connect(config.nosqldb, {
    useMongoClient: true,
  });
  const db = mongoose.connection;
  db.on('error', err => {
    console.error(`Error while connecting to Mongo DB: ${err.message}`);
  });
  db.once('open', () => {
    console.log('Mongo DB connected successfully!');
  });

  // ===== Initial processes
  require('./functions/initEnv')();

  // ===== Middleware =====
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());

  // ===== API =====
  app.use('/api', require('./routes/api'));
  app.use('/upload', require('./routes/upload'));
  // ===== Front End =====
  app.use('/', express.static(path.join(__dirname, '../dist/')));
  // Send all other requests to the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // =====  Port =====
  const port = config.port;
  const server = app.listen(port, () => {
    console.log(`Web server listening on: ${port}`);
    server.emit('started');
  });
  server.stop = () => {
    db.close(() => {
      console.log('Mongo DB disconnected!');
    });
    server.close(() => {
      console.log('Web Server Closed!');
      server.emit('end');
    });
  }
  return server;
}

module.exports = runServer;