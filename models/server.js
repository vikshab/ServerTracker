"use strict";

function Server() {
  this.table_name = "servers";
}

Server.prototype = require('../database');
module.exports = Server;
