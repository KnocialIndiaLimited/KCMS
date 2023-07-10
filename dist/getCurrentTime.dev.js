"use strict";

var getCurrentTime = function getCurrentTime() {
  var currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var TS = h * 3600 + m * 60;
};

module.exports = {
  getCurrentTime: getCurrentTime
};