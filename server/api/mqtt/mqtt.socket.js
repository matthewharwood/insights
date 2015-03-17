/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Mqtt = require('./mqtt.model');

exports.register = function(socket) {
  Mqtt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Mqtt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('mqtt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('mqtt:remove', doc);
}