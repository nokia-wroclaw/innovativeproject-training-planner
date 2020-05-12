import React from 'react';
import GeneralCalendar from '../calendar/generalCalendar.component';

const Home = () => {
  return (
    <div className="background">
      <div className="container center calendar-board">
        <div className="row">
          <GeneralCalendar height="550pt" />
        </div>
      </div>
    </div>
  );
};

export default Home;
