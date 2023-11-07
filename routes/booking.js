var express = require('express');
var router = express.Router();

/* GET booking page. */
router.get('/', function(req, res, next) {
  res.render('Booking',{ title: 'Booking' });
});

/* GET view booking page. */
router.get('/view', function(req, res, next) {
    res.render('viewBookings', { title: 'View Booking' });
  });

module.exports = router;
