"use strict";

var mongoose = require('mongoose');

var Holiday = mongoose.model("holiday", {
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  holiday_description: {
    type: String
  },
  holiday_from: {
    type: String
  },
  holiday_to: {
    type: String
  },
  created_by: {
    type: String
  },
  created_at: {
    type: String
  },
  updated_by: {
    type: String
  },
  updated_at: {
    type: String
  }
});
module.exports = {
  Holiday: Holiday
};