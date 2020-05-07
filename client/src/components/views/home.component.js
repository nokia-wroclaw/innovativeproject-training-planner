import React from 'react';
import GeneralCalendar from '../calendar/generalCalendar.component';

const Home = () => {
  return (
    <div className="container center" style={{height: 850}}>
      <h4>Home Page</h4>
      <GeneralCalendar height="550pt" />
      <br />
    </div>
  );
};

export default Home;
