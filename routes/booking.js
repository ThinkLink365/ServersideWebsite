var express = require('express');
var router = express.Router();
const booking = require('../routes/models/bookingmodel');


/* GET booking page. */
router.get('/', function(req, res, next) {
  res.render('booking',{ title: 'Booking' });
});

router.get('/search', function(req, res){
  res.render('search', {title: 'Search'});
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
router.get('/delete', async(req, res,) => {
  const bookingID = req.query.bookingID;
res.redirect(`/booking/delete/${bookingID}`)
  
  });
 router.get('/modify', async (req, res) => {
    const bookingID = req.query.bookID;
  res.redirect(`/booking/modify/${bookingID}`)
 });

  router.get('/modify/:id', async (req, res) => {
    
    try {
      const bookings = await booking.findById(req.params.id)

          res.render('modify', { bookings, title: 'Modify' });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');

    }
  });
      
  router.post('/edited/:id', async (req, res) => {
    const bookingID = req.body.id;
  
    try {
      const updatedBooking = await booking.findByIdAndUpdate(bookingID, req.body, { new: true });
  
      res.redirect('/booking/view');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }});
  
    router.get('/delete/:id', async (req, res) => {
      try {
        const bookings = await booking.findById(req.params.id);
        res.render('delete', { bookings, title: 'Delete' });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    });
    
    router.post('/removed/:id', async (req, res) => {
      try {
        const deletedBooking = await booking.findByIdAndDelete(req.params.id);
    
        // Redirect to the view bookings page after successful deletion
        res.redirect('/booking/view');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    });

module.exports = router;
