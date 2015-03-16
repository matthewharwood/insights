'use strict';

var _ = require('lodash');
var Space = require('./space.model');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

// client.subscribe('presence');
//this function will set all the intial subscritpions at runt time of the app.
//You'll have to come back to this because first a user must create a space.
Space.find(function(err, space){
  console.log(space);
  if(space.length !== 0){
    for(var i = 0; i <= space.length; i++){
      
      // console.log(space[i].name);
      // client.subscribe(space[i].name);
    }  
  }
});

//registers a new object in a space.  url: userid/spaceid
client.on('message', function (topic, message) {
  var newMessage = new Space();
  newMessage.name = message.toString('utf8');
  console.log(topic,message);
  Space.find({ name: newMessage.name}, function(err, space){
    if (err) { return handleError(res, err); }
    if(space.length === 0) 
      { 
        Space.create(newMessage, function(err, message) {
          
          if(err) { return handleError(res, err); }

        }); 
      }
  });
  
});

// Get list of spaces
exports.index = function(req, res) {
  Space.find(function (err, spaces) {
    if(err) { return handleError(res, err); }
    return res.json(200, spaces);
  });
};

// Get a single space
exports.show = function(req, res) {
  Space.findById(req.params.id, function (err, space) {
    if(err) { return handleError(res, err); }
    if(!space) { return res.send(404); }
    return res.json(space);
  });
};

// Creates a new space in the DB.
exports.create = function(req, res) {

  Space.create(req.body, function(err, space) {

    client.subscribe(space.owner);
    if(err) { return handleError(res, err); }
    return res.json(201, space);
  });
};

// Updates an existing space in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Space.findById(req.params.id, function (err, space) {
    if (err) { return handleError(res, err); }
    if(!space) { return res.send(404); }
    var updated = _.merge(space, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, space);
    });
  });
};

// Deletes a space from the DB.
exports.destroy = function(req, res) {
  Space.findById(req.params.id, function (err, space) {
    if(err) { return handleError(res, err); }
    if(!space) { return res.send(404); }
    space.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}