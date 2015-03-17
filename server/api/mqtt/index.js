'use strict';

var express = require('express');
var controller = require('./mqtt.controller');

var router = express.Router();

router.post('/:idx', controller.index);
router.get('/close', controller.close);

module.exports = router;
