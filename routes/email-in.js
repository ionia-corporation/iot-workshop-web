var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/email/in', function(req, res, next) {
  var content = req.body.plain;
  if (content === undefined || content === null || content.length < 1) {
    content = req.body.html;
  }
  if (content.indexOf('NOT HERE' > -1)) {
    // TODO: POST BACK TO LED
  }
  console.log(content);
  res.send('GOT IT!');
});

module.exports = router;