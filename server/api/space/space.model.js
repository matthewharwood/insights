'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpaceSchema = new Schema({
  name: String,
  info: String,
  owner: String,
  active: Boolean
});

module.exports = mongoose.model('Space', SpaceSchema);