var express = require('express');
var router = express.Router();
var servers = require('../controllers/servers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ServerTrack API',
                        record: 'https://servertrack.herokuapp.com/record',
                        average: 'https://servertrack.herokuapp.com/average/server_name',
                        example: 'https://servertrack.herokuapp.com/example'});
});

/* GET home page. */
router.get('/example', function(req, res, next) {
  res.render('example', { title: 'JSON example'});
});

/* PUT new record into database (in-memory). */
router.put('/record', function(req, res, next) {
  servers.serversController.record(req, res);
});

/* GET average for the specific server. */
router.get('/average/:server_name', function(req, res, next) {
  return servers.serversController.average(req, res);
});


module.exports = router;
