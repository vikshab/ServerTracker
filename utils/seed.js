"use strict";

module.exports = function(callback) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("file::memory:?cache=shared");

  var servers = require('./servers.json');
  var servers_statement = db.prepare(
    "INSERT INTO servers (server_name, cpu_load, ram_load, timestamp) VALUES (?, ?, ?, ?);"
  );

  db.serialize(function() {
    db.exec("BEGIN");
    for(var i = 0; i < servers.length; i++) {
      var server = servers[i];
      servers_statement.run(
        server.server_name,
        server.cpu_load,
        server.ram_load,
        server.timestamp
      );
    }
    servers_statement.finalize();

    db.exec("COMMIT", function(error) {
      db.close();
      console.log("I'm done seeding the db")
      callback(error, "Success");
    });
  })
}
