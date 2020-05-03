import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import {useOktaAuth} from '@okta/okta-react';
import {generateTemplates} from './calendarModelFunctions';

// Set Monday as a first day of the week in calendar
// without this line first day is Sunday
moment.locale('en', {week: {dow: 1}});

const UserCalendar = () => {
  const localizer = momentLocalizer(moment);
  const {authState, authService} = useOktaAuth();
  const [templateList, setTemplateList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const {accessToken} = authState;

      authService.getUser().then((info) => {
        axios.get(`/inviteTemplate/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            username: info.preferred_username,
          },
        }).then((res) => setTemplateList(res.data));
      });
    }
  }, [authState, authService]);

  useEffect(() => {
    const tempEvents = [];
    generateTemplates(templateList, tempEvents);
    setEventList(tempEvents);
  }, [templateList]);

  return (
    <div style={{height: '550pt'}}>
      <Calendar
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        timeslots={6}
      />
    </div>
  );
};

export default UserCalendar;
