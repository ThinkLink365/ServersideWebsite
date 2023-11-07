var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Homepage' });
});
/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
