const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {
     type: String,
     required: true,
  },
   email: {
       type: String,
       required: true,
   },
   contactNumber: {
       type:String,
       required:true,
   },
   date: {
       type: Date,
       required: true,
   },
   time: {
     type:String,
     required: true,
   },
   card_name:{
     type: String,
     required: true,
   },
   card_number:{
     type: Number,
     required:true,
   },
   card_month:{
     type:String,
     required:true,
   },
   card_year:{
     type:Number,
     required:true,
   },
   cvv:{
     type:Number,
     required:true,
   }
  },
  { 
    timestamps: true
  }
  );  
  const booking = mongoose.model("booking", bookingSchema);
  
module.exports = booking; 