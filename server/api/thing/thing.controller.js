/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

// Thing.find(function(err, thing){
//   console.log(thing);
//   if(thing.length !== 0){
//     for(var i = 0; i <= thing.length; i++){
      
//       // console.log(thing[i].name);
//       client.subscribe(thing[i].name);
//     }  
//   }
// });
// client.subscribe('thebattery');
console.log(client.subscribe('thebattery'));
client.on('message', function (topic, message) {
  var newThing = new Thing();
  newThing.name = message.toString('utf8');
  console.log(newThing, 'newthing')
  Thing.find({ name: newThing.name}, function(err, found){
    console.log(typeof found, found, 'update');
    if (err) { return handleError(res, err); }
    if(found.length === 0) 
      { 
        Thing.create(newThing, function(err, message) {
          console.log(message, 'created');
          if(err) { return handleError(res, err); }

        }); 
      }
  });
  
});

// Get list of things
exports.index = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  console.log(req.body._id, 'request', req.params);
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}