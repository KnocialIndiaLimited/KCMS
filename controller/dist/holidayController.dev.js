"use strict";

var _require = require('../module/holiday'),
    Holiday = _require.Holiday;

var counterSchema = require('../module/counter');

var datezone = require('../dateZone');

var addHolidays = function addHolidays(req, res) {
  counterSchema.findOneAndUpdate({
    id: "holidays_seq"
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
        id: "holidays_seq",
        seq: 1
      });
      newval.save();
      seqId = 1;
    } else {
      seqId = cd.seq;
    }

    var holiday = new Holiday({
      _id: seqId,
      title: req.body.title,
      holiday_description: req.body.holiday_description,
      holiday_from: req.body.holiday_from,
      holiday_to: req.body.holiday_to,
      created_by: req.body.created_by,
      created_at: datezone.datezone
    });
    holiday.save(function (err, docs) {
      if (!err) {
        res.json(docs);
      } else {
        res.json(err);
      }
    });
  });
};

var getAllHoliday = function getAllHoliday(req, res) {
  Holiday.find(function (err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.json(err);
    }
  });
};

var deleteHoliday = function deleteHoliday(req, res) {
  var deleteid = req.params.id;
  Holiday.findByIdAndDelete(deleteid, function (err, del) {
    if (!err) {
      res.json(del);
    } else {
      res.json(err);
    }
  });
};

module.exports = {
  addHolidays: addHolidays,
  getAllHoliday: getAllHoliday,
  deleteHoliday: deleteHoliday
};