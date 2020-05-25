const router = require('express').Router();
const BookingDate = require('../models/bookingDate.model');
const okta = require('../toolset/okta');

router.route('/save').post(okta.authenticationRequired, (req, res) => {
  const bookingDate = req.body;
  const newBookingDate = new BookingDate(bookingDate);

  newBookingDate
      .save()
      .then(() => res.json('BookingDate saved!'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/all').get(okta.authenticationRequired, (req, res) => {
  BookingDate.find()
      .then((bookingDate) => res.json(bookingDate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:_id').post((req, res) => {
  BookingDate.deleteOne(req.params)
      .then(() => res.json('Booked termin deleted!'))
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/get/:_id').get(okta.authenticationRequired, (req, res) => {
  BookingDate.find(req.params)
      .then((bookingDate) => res.json(bookingDate))
      .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
