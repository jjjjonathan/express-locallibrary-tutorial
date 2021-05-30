var express = require('express');
var router = express.Router();

// GET root, redirect to catalog
router.get('/', function (req, res) {
  res.redirect('/catalog');
});

module.exports = router;
