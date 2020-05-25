import React from 'react';
import BookingCalendar from '../calendar/bookingCalendar.component';

const BookingDashboard = () => {
  return (
    <div className="background">
      <div className="container center calendar-board">
        <h5>
          Here you can book the date of your training.
        </h5>
        <h5>
          The calendar below shows scheduled meetings and other reservations.
        </h5>
        <br />
        <BookingCalendar height="550pt" />
        <br />
      </div>
    </div>
  );
};

export default BookingDashboard;
