var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  var parts = url.parse(process.env.CLOUDMQTT_URL);
  var auth = parts.auth.split(':');
  res.render('index', {
    title: 'The Xively Button',
    MQTT_SERVER_PORT: parts.port,
	MQTT_SERVER_ADDR: parts.hostname,
	MQTT_USERNAME_S: auth[0],
	MQTT_KEY: auth[1]
  });
});

module.exports = router;