/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var config = require('./config/environment');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }
// console.log(__dirname);
var options = {
  key: fs.readFileSync(__dirname + '/keys/key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/cert.pem')
}

// Setup server
var app = express();
if(config.env === 'production') {
  var server = require('https').createServer(options, app);
} else {
  var server = require('http').createServer(app);  
}

var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;