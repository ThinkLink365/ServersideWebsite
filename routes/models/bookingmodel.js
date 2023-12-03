// Importing mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Creating a schema using the mongoose.Schema class
const Schema = mongoose.Schema;

// Defining the structure of the booking schema
const bookingSchema = new Schema({
    // Name of the person making the booking (String type, required)
    name: {
        type: String,
        required: true,
    },
    // Email of the person making the booking (String type, required)
    email: {
        type: String,
        required: true,
    },
    // Contact number of the person making the booking (String type, required)
    contactNumber: {
        type: String,
        required: true,
    },
    // Date of the booking (Date type, required)
    date: {
        type: Date,
        required: true,
    },
    // Time of the booking (String type, required)
    time: {
        type: String,
        required: true,
    },
    // Name on the credit card used for the booking (String type, required)
    card_name: {
        type: String,
        required: true,
    },
    // Credit card number used for the booking (Number type, required)
    card_number: {
        type: Number,
        required: true,
    },
    // Expiry month of the credit card used for the booking (String type, required)
    card_month: {
        type: String,
        required: true,
    },
    // Expiry year of the credit card used for the booking (Number type, required)
    card_year: {
        type: Number,
        required: true,
    },
    // CVV (Card Verification Value) of the credit card used for the booking (Number type, required)
    cvv: {
        type: Number,
        required: true,
    }
},
// Additional configuration for the schema (timestamps for createdAt and updatedAt)
{
    timestamps: true
});

// Creating a model based on the booking schema
const booking = mongoose.model("booking", bookingSchema);

// Exporting the booking model to be used in other parts of the application
module.exports = booking;
