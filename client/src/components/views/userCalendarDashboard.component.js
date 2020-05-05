import React from 'react';
import UserCalendar from '../calendar/userCalendar.component';

const UserCalendarDashboard = () => {
  return (
    <div className="container">
      <h5 className="center">
        Here you can see all the trainings you have been invited to and those
        you organize
      </h5>
      <br />
      <UserCalendar height="550pt" />
    </div>
  );
};

export default UserCalendarDashboard;
