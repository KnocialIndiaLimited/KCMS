"use strict";

var _require = require('../module/event'),
    Event = _require.Event;

var counterSchema = require('../module/counter');

var datezone = require('../dateZone');

var addEvent = function addEvent(req, res) {
  counterSchema.findOneAndUpdate({
    id: "event_seq"
  }, {
    "$inc": {
      "seq": 1
    }
  }, {
    "new": true
  }, function (err, cd) {
    var seqId;

    if (cd == null) {
      var newval = new counterSchema({
        id: "event_seq",
        seq: 1
      });
      newval.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }

    var event = new Event({
      _id: seqId,
      title: req.body.title,
      event_description: req.body.event_description,
      event_date: req.body.event_date,
      event_time: req.body.event_time,
      created_by: req.body.created_by,
      created_at: datezone.datezone
    });
    event.save(function (err, docs) {
      if (!err) {
        res.json(docs);
      } else {
        res.json(err);
      }
    });
  });
};

var getAllEvent = function getAllEvent(req, res) {
  Event.find(function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
};

var deleteEvent = function deleteEvent(req, res) {
  var deleteid = req.params.id;
  Event.findByIdAndDelete(deleteid, function (err, del) {
    if (!err) {
      res.json(del);
    } else {
      res.json(err);
    }
  });
};

module.exports = {
  addEvent: addEvent,
  getAllEvent: getAllEvent,
  deleteEvent: deleteEvent
};