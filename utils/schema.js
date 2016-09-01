"use strict";

module.exports = function(callback) {
  var sqlite3 = require("sqlite3").verbose();
  var db = new sqlite3.Database("file::memory:?cache=shared");

  var servers = [
    ["server_name", "text"],
    ["cpu_load", "real"],
    ["ram_load", "real"],
    ["timestamp", "text"]
  ];

  db.serialize(function() {
    db.exec("BEGIN");

    db.exec("DROP TABLE IF EXISTS servers;");

    db.exec("CREATE TABLE servers (id INTEGER PRIMARY KEY);");

    for(var i = 0; i < servers.length; i++){
      var name = servers[i][0],
          type = servers[i][1];
      db.exec("ALTER TABLE servers ADD COLUMN " + name + " " + type + ";");
    }

    db.exec("COMMIT", function(error) {
      db.close();
      callback(error, "Success");
      console.log("I'm done setting up the db")
    });
  });
}
