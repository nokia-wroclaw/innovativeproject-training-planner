const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingDateSchema = new Schema(
    {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      userName: {
        type: Array,
        required: true,
      },
    },
    {
      timestamps: true,
    },
);

const BookingDate = mongoose.model('BookingDate', bookingDateSchema);

module.exports = BookingDate;
