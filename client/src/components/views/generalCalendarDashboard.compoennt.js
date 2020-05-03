import React from 'react';
import GeneralCalendar from '../calendar/generalCalendar.component';

const GeneralCalendarDashboard = () => {
  return (
    <div className="container">
      <h5 className="center">
        We invite you to take part in the training!
      </h5>
      <br></br>
      <GeneralCalendar />
    </div>
  );
};

export default GeneralCalendarDashboard;
