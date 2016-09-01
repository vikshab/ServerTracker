"use strict";
var sqlite3 = require("sqlite3").verbose();

module.exports = {
  prune: function(currentTime) {
    var db = new sqlite3.Database("file::memory:?cache=shared");
    var past24hours = currentTime - (24 * 60 * 60000 + 60000);
    var statement =  "DELETE FROM servers WHERE (timestamp < " + past24hours + ");";

    db.all(statement, function(err, res) {
      db.close();
    });
  },

  record: function(data, timestamp, callback) {
    var db = new sqlite3.Database("file::memory:?cache=shared");
    var statement = "INSERT INTO servers (server_name, cpu_load, ram_load, timestamp) VALUES (" + "'" +
                      data.server_name + "'" + ", " +
                      data.cpu_load + ", " +
                      data.ram_load + ", " +
                      timestamp + ");";
    db.all(statement, function(err, res) {
      if (callback) callback(err, res);
      db.close();
    });
  },

  display24h: function(server_name, currentTime, callback) {
    var db = new sqlite3.Database("file::memory:?cache=shared");
    var _24hoursAgo = currentTime - (24 * 60 * 60000);
    var statement = "SELECT server_name, cpu_load, ram_load, timestamp FROM servers WHERE server_name =" + "'" +
                    server_name + "'" + " AND (timestamp > " + _24hoursAgo +
                    ") AND (timestamp < " + currentTime +
                     ") ORDER BY timestamp;";
    db.all(statement, function(err, res) {
      if (callback) callback(err, res);
      db.close();
    });
  }
}
