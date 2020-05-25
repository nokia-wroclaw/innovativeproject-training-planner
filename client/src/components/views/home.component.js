import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import GeneralCalendar from '../calendar/generalCalendar.component';

const Home = () => {
  const {authService} = useOktaAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  return (
    <div className="background">
      <div className="container center calendar-board">
        <div className="row">
          <h4>Hello {username}!</h4>
          <h5>
            Here you can see all the trainings you have been
            invited to and those you organize.
          </h5>
        </div>
        <div className="row">
          <GeneralCalendar height="550pt" />
        </div>
      </div>
    </div>
  );
};

export default Home;
