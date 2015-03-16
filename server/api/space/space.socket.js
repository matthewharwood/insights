/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Space = require('./space.model');

exports.register = function(socket) {
  Space.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Space.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('space:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('space:remove', doc);
}