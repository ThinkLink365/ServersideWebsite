const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require("body-parser")

const indexRouter = require('./routes/index');
const bookingRouter = require('./routes/booking');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

const {default: mongoose} = require("mongoose");
const booking = require('./routes/models/bookingmodel');
const url = 'mongodb://127.0.0.1:27017/SSWD';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.post("/Booking", function(req, res){
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
  .then((savedBooking) =>{
    booking.find()
    .then((bookingsfound) => {
      res.render('viewBookings',{'bookingDetails': bookingsfound, title:'View Booking'})
    })
    })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/booking', bookingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
          code:err.status,
          message:err.message,
  });
});

module.exports = app;
