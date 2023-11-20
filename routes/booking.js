var express = require('express');
var router = express.Router();
const booking = require('../routes/models/bookingmodel');


/* GET booking page. */
router.get('/', function(req, res, next) {
  res.render('booking',{ title: 'Booking' });
});

router.post("/Booking", function(req, res){
  let newBooking = new booking({
      name: req.body.name,
      email: req.body.email,
      contactNumber: req.body.contact_number,
      date: req.body.date,
      time: req.body.time,
      card_name: req.body.card_name,
      card_number: req.body.card_number,
      card_month: req.body.card_month,
      card_year: req.body.card_year,
      cvv: req.body.cvv,
  });
  newBooking.save()
  .then((savedBooking) => {
    res.redirect('/booking/view');
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Server Error');
  });
})
/* GET view booking page. */
router.get('/view', async (req, res) => {
  try {
    const bookingsfound = await booking.find();
    res.render('viewBookings', { bookingDetails: bookingsfound, title: 'View Booking' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
router.get('/delete', async(req, res, next) {
    res.render('delete', { title: 'Delete' });
    try {
      const bookings= await booking.find()
          res.render('modify', { bookings, title: 'Modify' });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
router.get('/modify', async (req, res) => {
    try {
      const bookings= await booking.find()
          res.render('modify', { bookings, title: 'Modify' });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;
