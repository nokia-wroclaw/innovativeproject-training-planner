import React from 'react';
import UserCalendar from '../calendar/userCalendar.component';

const UserCalendarDashboard = () => {
  return (
    <div className="background">
      <div className="container center cal-board">
        <h5>
          Here you can see all the trainings you have been invited to and those
          you organize
        </h5>
        <br />
        <UserCalendar height="550pt" />
        <br />
      </div>
    </div>
  );
};

export default UserCalendarDashboard;
