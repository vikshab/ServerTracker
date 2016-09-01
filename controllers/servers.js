"use strict";
var Server = require("../models/server.js");
var db = new Server();

// Deleting old records from table every hour
setInterval(function prune(){
  var currentTime = Date.now();
  db.prune(currentTime);
}, 3600000);

exports.serversController = {
  record: function(req, res) {
    var responseBody = Object.keys(req.body);
    var dataString = responseBody[0];
    var data = JSON.parse(dataString);
    var timestamp = Date.now();
    db.record(data, timestamp, function(err, result){
      res.status(200).json(result);
    });
  },

  average: function(req, res) {
    var server_name = req.params.server_name;
    var currentTime = Date.now();

    db.display24h(server_name, currentTime, function(err,result){
      var displayLastHour = avgLastHour(result, currentTime);
      var displayLastDay = avgLastDay(result, currentTime);
      return res.status(200).json({avgLastHour: displayLastHour, avgLastDay: displayLastDay});
    });
  }
}

  /**
   * @summary Calculates average for the last 60 minutes broken down by min,
   * Average for the last hour is sum_of_all_loads_per_min/count_of_minutes (60).
   *
   * @param {object} result A list of all records for the last 24 hours,
   * the last element of which is the last added record.
   * @param {number} startTime time when average was requested.
   * @return {object} averages A list of objects with avg loads and time by min
   */
  function avgLastHour(result, startTime) {
    var averages = [];
    var count = 0;
    var sum_cpu = 0;
    var sum_ram = 0;
    var average_cpu, average_ram, timePDT, i;
    var hourDifferenceWithUTC = 60000*60*7;
    var endTime = startTime - 60000*60;
    var index = findStartIndex(result, endTime);

    // index is undefined when no records were added in the database for the last hour
    if (index !== undefined) {
      for (i = index; i < result.length; i++) {
        count ++;
        sum_cpu += result[i].cpu_load;
        sum_ram += result[i].ram_load;
        average_cpu = sum_cpu/count;
        average_ram = sum_ram/count;
        timePDT = new Date(result[i].timestamp - hourDifferenceWithUTC);
        averages.push({average_cpu_load: average_cpu, average_ram_load: average_ram, time: timePDT});
      }
    }
    return averages = averages.reverse();
  }

  /**
   * @summary Calculates average for the last 24h (1440 mins) broken down by hours,
   * Average for the last 24h is sum_of_all_loads_per_min/count_of_minutes (1440).
   *
   * @param {object} result A list of all records for the last 24 hours,
   * the last element of which is the last added record.
   * @param {number} startTime time when average was requested.
   * @return {object} averages A list of objects with avg loads and time by hours
   */
  function avgLastDay(result, startTime) {
    var averages = [];
    var count = 0;
    var sum_cpu = 0;
    var sum_ram = 0;
    var average_cpu, average_ram, isHour, timePDT, i;
    var hourDifferenceWithUTC = 60000*60*7;
    var endTime = startTime - 60000*60*24;

    for (i = 0; i < result.length; i++) {

      // Mark the time, starting from the beginning of the list, that indicates that
      // one hour has passed
      // Note: time at 0 index doesn't count
      isHour = Math.abs((result[i].timestamp - result[0].timestamp)/60000) % 60 == 0 && i != 0;

      // Count every minute and update the sum
      count ++;
      sum_cpu += result[i].cpu_load;
      sum_ram += result[i].ram_load;

      // If minute indicates that 1 hour has passed,
      // Calculate the average for all the minutes
      // and fix the time
      if (isHour && result[i].timestamp >= endTime) {
        average_cpu = sum_cpu/count;
        average_ram = sum_ram/count;
        timePDT = new Date(result[i].timestamp - hourDifferenceWithUTC);
        averages.push({average_cpu_load: average_cpu, average_ram_load: average_ram, time: timePDT})
      }
    }
    return averages = averages.reverse();
  }

  /**
   * @summary
   *
   * @param {object} result A list of all records for the last 24 hours,
   * the last element of which is the last added record.
   * @param {number} time 60 mins ago from the time when average was requested
   * @return {number} index the first valid index of the list of all records,
   * which is inside the 60 mins range
   */
  function findStartIndex(result, time) {
    var count = 0;
    var index, i;

    // Traverse from the end of the list, since the last added record is in the end
    // Count 60 minutes
    for (i = result.length - 1; i >= 0; i--) {

      // We need minutes just for the last hour
      if (count == 60) {
        break;
      }
      if (result[i].timestamp >= time) {
        index = i;
        count ++;
      } else {
        break; // break if there are no more records for the last hour
      }
    }
    return index;
  }
