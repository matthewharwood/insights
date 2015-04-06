'use strict';

var _ = require('lodash');
// var Mqtt = require('./mqtt.model');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');



exports.index = function(req, res) {

  //client.publish('54fdd08ce13a197b28a990ab', "1111102230-04-1231");
  // client.publish('hello', req.params.idx);
  // console.log('sent!', req.params.idx);
  return res.json(200, {'message': req.params.idx});
};

exports.close = function(req, res){
  client.end();
  return res.json(200, {'message': 'client closed'})
};

exports.light = function(req, res) {
  console.log('hey you mqtt');
  client.publish('thebatteryseb', 'lightok');

};

exports.lampOn = function(req, res) {
  console.log('hey you lamp on');
  client.publish('thebatterylamp', 'on');

};

exports.lampOff = function(req, res) {
  console.log('hey you lamp off');
  client.publish('thebatterylamp', 'off');

};
