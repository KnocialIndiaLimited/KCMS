"use strict";

var express = require('express');

var router = express.Router();

var EventController = require('../controller/eventController');

var HolidayController = require('../controller/holidayController');

router.post('/event', EventController.addEvent);
router.get('/event', EventController.getAllEvent);
router["delete"]('/event/:id', EventController.deleteEvent);
router.post('/holiday', HolidayController.addHolidays);
router.get('/holiday', HolidayController.getAllHoliday);
router["delete"]('/holiday/:id', HolidayController.deleteHoliday);
module.exports = router;