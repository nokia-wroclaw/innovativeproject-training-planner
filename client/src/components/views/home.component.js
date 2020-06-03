import React, {useEffect, useState} from 'react';
import {useOktaAuth} from '@okta/okta-react';
import GeneralCalendar from '../calendar/generalCalendar.component';
import MeetingReminder from '../reminder/meetingReminder.component';

const Home = () => {
  const {authService} = useOktaAuth();
  const [username, setUsername] = useState('');
  const today = new Date();
  useEffect(() => {
    authService.getUser().then((info) => {
      setUsername(info.preferred_username);
    });
  }, [authService]);

  return (
    <div className="background">
      <div className="container center">
        <div className="row">
          <h4>Hello {username}!</h4>
          {console.log(today)}
        </div>

        <div className="row">
          <h5>
            Upcoming trainings
          </h5>
        </div>
        <div className="row reminders" >
          <MeetingReminder></MeetingReminder>
        </div>
        <div className="row">
          <h5>
            Here you can see all the trainings you have been
            invited to and those you organize.
          </h5>
        </div>
        <div className="row"></div>
        <GeneralCalendar height="550pt" />

      </div>
    </div>
  );
};

export default Home;
