//importing express library and creating a router
var express = require('express');
var router = express.Router();

//Importing booking model
const booking = require('../routes/models/bookingmodel');


/* GET booking page. */
router.get('/', function (req, res, next) {
  res.render('booking', { title: 'Booking' });
});

//Handling POST requests for creating a new booking
router.post("/Booking", function (req, res) {
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
  //Saving the new booking to the database
  newBooking.save()
    .then((savedBooking) => {
      //redirecting to the view bookings page once it has been saved
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
    //get all the bookings from the database
    const bookingsfound = await booking.find();
    //render viewbookings with those details
    res.render('viewBookings', { bookingDetails: bookingsfound, title: 'View Booking' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Handling GET requests for deleting a booking
router.get('/delete', async (req, res,) => {
  const bookingID = req.query.bookingID;
  res.redirect(`/booking/delete/${bookingID}`)
});

//Handling GET requests for modifing a booking
router.get('/modify', async (req, res) => {
  const bookingID = req.query.bookID;
  res.redirect(`/booking/modify/${bookingID}`)
});

//Handling GET requests for searching a booking
router.get('/search', async (req, res) => {
  const bookingsfound = await booking.find();
  res.render('search', { bookingDetails: bookingsfound, title: 'Search' });
});

//Handling POST requests for searching a booking
router.post('/search', async (req, res) => {
  const searchName = req.body.searchName;
  res.redirect(`/booking/search/${searchName}`);
});

// Handling GET requests for displaying search results
router.get('/search/:query', async (req, res) => {
   // Searching for bookings with the specified name in the database
  const bookings = await booking.find({ name: req.params.query }).exec();
  // Rendering the searchedBooking page with the search results
  res.render('searchedBooking', { query: req.params.query, bookings: bookings, title: 'Searched' })
});

// Handling GET requests for modifying a specific booking
router.get('/modify/:id', async (req, res) => {

  try {
    // Finding the booking by ID in the database
    const bookings = await booking.findById(req.params.id)
    // Rendering the modify page with the fetched booking details
    res.render('modify', { bookings, title: 'Modify' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');

  }
});

// Handling POST requests for updating a booking
router.post('/edited/:id', async (req, res) => {
  const bookingID = req.body.id;
  try {
    // Updating the booking in the database with the provided data
    const updatedBooking = await booking.findByIdAndUpdate(bookingID, req.body, { new: true });
    // Redirecting to the view bookings page after successful update
    res.redirect('/booking/view');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Handling GET requests for deleting a specific booking
router.get('/delete/:id', async (req, res) => {
  try {
    // Finding the booking by ID in the database
    const bookings = await booking.findById(req.params.id);
    // Rendering the delete page with the fetched booking details
    res.render('delete', { bookings, title: 'Delete' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Handling POST requests for removing a booking
router.post('/removed/:id', async (req, res) => {
  try {
    // Deleting the booking from the database by ID
    const deletedBooking = await booking.findByIdAndDelete(req.params.id);

    // Redirect to the view bookings page after successful deletion
    res.redirect('/booking/view');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Exporting the router for use in other parts of the application
module.exports = router;
