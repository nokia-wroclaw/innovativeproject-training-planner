import React from 'react';
import GeneralCalendar from '../calendar/generalCalendar.component';

const Home = () => {
  return (
    <div className="container center-align">
      <h1>Home Page</h1>
      <GeneralCalendar height="550pt" />
      <br />
    </div>
  );
};

export default Home;
