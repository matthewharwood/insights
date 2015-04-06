'use strict';

var express = require('express');
var controller = require('./mqtt.controller');

var router = express.Router();

router.post('/:idx', controller.index);
router.get('/close', controller.close);
router.get('/light', controller.light);
router.get('/lampOn', controller.lampOn);
router.get('/lampOff', controller.lampOff);

module.exports = router;
